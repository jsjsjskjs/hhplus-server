import { ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common"
import { BaseSeatRepository } from "@root/seat/repository/seat/seat.repository.abstract"
import { RedisService } from "@root/redis/redis.service"

@Injectable()
export class SeatService {
  constructor(
    @Inject("BaseSeatRepository") private readonly baseSeatRepo: BaseSeatRepository,
    private readonly redisService: RedisService,
  ) {}
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

  async completionSeat(concertDatesId: string, seatId: string, email: string) {}
}
