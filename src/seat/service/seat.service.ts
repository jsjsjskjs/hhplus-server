import { ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common"
import { BaseSeatRepository } from "@root/seat/repository/seat/seat.repository.abstract"
import { RedisService } from "@root/redis/redis.service"
import { CompletionSeatDto } from "@root/seat/dto/seat.dto"
import { Client } from "@root/client/entites/client.entity"
import { ClientService } from "@root/client/service/client.service"
import { ReservationService } from "@root/reservation/service/reservation.service"

@Injectable()
export class SeatService {
  constructor(
    @Inject("BaseSeatRepository") private readonly baseSeatRepo: BaseSeatRepository,
    private readonly redisService: RedisService,
    private readonly clientService: ClientService,
    private readonly reservationService: ReservationService,
  ) {}
  async findOneById(id: string) {
    return await this.baseSeatRepo.findOneById(id)
  }
  async getPossibleSeats(concertDatesId: string) {
    const allSeats = await this.baseSeatRepo.findNotBookingByConcertDateId(concertDatesId)
    const bookedSeats = await this.redisService.getKeysWithPrefix(`${concertDatesId}:`)
    console.log("bookedSeats", bookedSeats)

    return allSeats.filter((seat) => {
      const exist = bookedSeats.includes(
        `${concertDatesId}:${seat.section}:${seat.row}:${seat.number}`,
      )
      return !exist
    })
  }

  async bookingSeat(concertDatesId: string, seatId: string, email: string) {
    const seat = await this.baseSeatRepo.findOneById(seatId)
    if (seat.isBooked) {
      throw new ForbiddenException("Seat is already booked")
    }
    console.log("seat", seat)
    const key = `${seat.concertDates.id}:${seat.section}:${seat.row}:${seat.number}`
    const ttl = 7 * 60 * 1000
    const lock = await this.redisService.acquireSeatLock(key, ttl)
    if (lock) {
      return seat
    } else {
      throw new ForbiddenException("Seat is already booked")
    }
  }

  async completionSeat(
    concertDatesId: string,
    seatId: string,
    dto: CompletionSeatDto,
    email: string,
    sessionId: string,
  ) {
    const client = await this.clientService.findOneByEmail(email)
    const seat = await this.findOneById(seatId)
    if (client.point < seat.seatGrade.price) {
    }
    await this.clientService.usePoint(client.id, seat, dto.address)
    await this.redisService.removeFromPartiQueue(concertDatesId, sessionId)
    const key = `${seat.concertDates.id}:${seat.section}:${seat.row}:${seat.number}`
    await this.redisService.releaseSeatLock(key)
    return await this.reservationService.findOneBySeatAndClient(client, seat)
  }
}
