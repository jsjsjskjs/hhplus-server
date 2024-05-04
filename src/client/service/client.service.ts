import { forwardRef, Inject, Injectable, UnauthorizedException } from "@nestjs/common"
import { BaseClientRepository } from "@root/client/repository/client.repository.abstract"
import { RedisService } from "@root/redis/redis.service"
import { EnterEntriesDto } from "@root/client/dto/client.dto"
import { DataSource, EntityManager } from "typeorm"
import { GetEntriesType } from "@root/client/enum/client.enum"
import { AuthService } from "@root/auth/service/auth.service"
import { ConcertDatesService } from "@root/concert/service/concert-dates.service"
import { Seat } from "@root/seat/entites/seat.entity"

@Injectable()
export class ClientService {
  constructor(
    @Inject("BaseClientRepository") private readonly baseClientRepo: BaseClientRepository,
    private readonly redisService: RedisService,
    private readonly concertDatesService: ConcertDatesService,
    private connection: DataSource,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {}

  async findOneById(id: string, manager?: EntityManager) {
    return await this.baseClientRepo.findOneById(id, manager)
  }

  async findOneByEmail(email: string, manager?: EntityManager) {
    return await this.baseClientRepo.findOneByEmail(email, manager)
  }

  async enterEntries(email: string, sessionId: string, dto: EnterEntriesDto) {
    const client = await this.findOneByEmail(email)
    if (!client) {
      throw new UnauthorizedException("Invalid email or password")
    }
    const concertDates = await this.concertDatesService.findOneById(dto.concertDatesId)
    const currentTimeSeconds = Math.floor(Date.now() / 1000)
    await this.redisService.addToReadyQueue(
      concertDates.id,
      sessionId,
      currentTimeSeconds,
    )
    return { message: "ok" }
  }

  async enterParticipant(
    sessionId: string,
    concertDatesId: string,
    myReadyNumber: number,
  ) {
    await this.redisService.addToParticipantQueue(
      concertDatesId,
      sessionId,
      Math.floor(Date.now() / 1000),
    )
    await this.redisService.removeFromReadyQueue(concertDatesId, sessionId)
    const { participant_token } = await this.authService.getParticipantToken(
      concertDatesId,
      sessionId,
    )
    return {
      type: GetEntriesType.ATTENDING,
      nowNumber: myReadyNumber,
      token: participant_token,
    }
  }
  async getEntries(email: string, sessionId: string, concertDatesId: string) {
    const client = await this.findOneByEmail(email)
    if (!client) {
      throw new UnauthorizedException("Invalid email or password")
    }
    const myReadyNumber = await this.redisService.getMyReadyRank(
      concertDatesId,
      sessionId,
    )
    const partiQueueSize = await this.redisService.getPartiQueueSize(
      concertDatesId + "-parti",
    )
    if (myReadyNumber === 1 && partiQueueSize === 10) {
      const expiredNumber = await this.redisService.removeExpiredParticipants(
        concertDatesId,
      )
      if (expiredNumber > 0) {
        return await this.enterParticipant(sessionId, concertDatesId, myReadyNumber)
      } else {
        return { type: GetEntriesType.WAITING, nowNumber: myReadyNumber }
      }
    } else if (myReadyNumber === 1 && partiQueueSize < 10) {
      return await this.enterParticipant(sessionId, concertDatesId, myReadyNumber)
    } else {
      return { type: GetEntriesType.WAITING, nowNumber: myReadyNumber }
    }
  }

  async findPoint(id: string) {
    return await this.baseClientRepo.findOneById(id)
  }
  async addPoint(id: string, amount: number) {
    return await this.connection.transaction(async (manager: EntityManager) => {
      return await this.baseClientRepo.addPoint(id, amount, manager)
    })
  }

  async usePoint(id: string, seat: Seat, address: string) {
    return await this.connection.transaction(async (manager: EntityManager) => {
      return await this.baseClientRepo.usePoint(id, seat, address, manager)
    })
  }
}
