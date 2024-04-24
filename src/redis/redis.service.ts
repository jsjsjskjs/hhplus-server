import { Inject, Injectable } from "@nestjs/common"
import { BaseRedisAdapter } from "@root/redis/redis.adapter.abstract"

@Injectable()
export class RedisService {
  constructor(
    @Inject("BaseRedisAdapter") private readonly baseRedisAdapter: BaseRedisAdapter,
  ) {}
  async addToReadyQueue(
    concertId: string,
    sessionId: string,
    currentTimeSeconds: number,
  ) {
    return await this.baseRedisAdapter.addToReadyQueue(
      concertId,
      sessionId,
      currentTimeSeconds,
    )
  }

  async addToParticipantQueue(
    concertId: string,
    sessionId: string,
    currentTimeSeconds: number,
  ) {
    return await this.baseRedisAdapter.addToParticipantQueue(
      concertId,
      sessionId,
      currentTimeSeconds,
    )
  }

  async getMyReadyRank(
    concertDatesId: string,
    sessionId: string,
  ): Promise<number | null> {
    return await this.baseRedisAdapter.getMyReadyRank(concertDatesId, sessionId)
  }

  async getPartiQueueSize(concertDatesId: string) {
    return await this.baseRedisAdapter.getQueueSize(concertDatesId + "-parti")
  }

  async removeFromQueue(concertDatesId: string, sessionId: string) {
    await this.baseRedisAdapter.removeFromQueue(concertDatesId, sessionId)
  }
}
