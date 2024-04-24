import { forwardRef, Inject, Injectable } from "@nestjs/common"
import { BaseClientRepository } from "@root/client/repository/client.repository.abstract"
import { RedisService } from "@root/redis/redis.service"
import { EnterEntriesDto, GetEntriesResDto } from "@root/client/dto/client.dto"
import { ConcertService } from "@root/concert/service/concert.service"
import { EntityManager } from "typeorm"
import { GetEntriesType } from "@root/client/enum/client.enum"
import { AuthService } from "@root/auth/service/auth.service"

@Injectable()
export class ClientService {
  constructor(
    @Inject("BaseClientRepository") private readonly baseClientRepo: BaseClientRepository,
    private readonly redisService: RedisService,
    private readonly concertService: ConcertService,
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
    }
    const concertDates = await this.concertService.findOneById(dto.concertId)
    const currentTimeSeconds = Math.floor(Date.now() / 1000)
    await this.redisService.addToReadyQueue(
      concertDates.id,
      sessionId,
      currentTimeSeconds,
    )
  }

  async getEntries(email: string, sessionId: string, concertDatesId: string) {
    const client = await this.findOneByEmail(email)
    if (!client) {
    }
    const myReadyNumber = await this.redisService.getMyReadyRank(
      concertDatesId,
      sessionId,
    )
    const partiQueueSize = await this.redisService.getPartiQueueSize(
      concertDatesId + "-parti",
    )
    if (myReadyNumber === 1 && partiQueueSize < 10) {
      await this.redisService.addToParticipantQueue(
        concertDatesId,
        sessionId,
        Math.floor(Date.now() / 1000),
      )
      await this.redisService.removeFromQueue(concertDatesId, sessionId)
      const { participant_token } = await this.authService.getParticipantToken(
        concertDatesId,
        sessionId,
      )
      return {
        type: GetEntriesType.ATTENDING,
        nowNumber: myReadyNumber,
        token: participant_token,
      }
    } else {
      return { type: GetEntriesType.WAITING, nowNumber: myReadyNumber }
    }
  }
}
