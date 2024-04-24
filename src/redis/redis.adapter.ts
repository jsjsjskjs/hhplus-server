import { Inject, Injectable } from "@nestjs/common"
import Redis from "ioredis"
import { BaseRedisAdapter } from "@root/redis/redis.adapter.abstract"

@Injectable()
export class RedisAdapter implements BaseRedisAdapter {
  constructor(@Inject("REDIS_CLIENT") private readonly redis: Redis) {}

  async addToReadyQueue(
    concertId: string,
    sessionId: string,
    currentTimeSeconds: number,
  ) {
    await this.redis.zadd(concertId + "-ready", currentTimeSeconds, sessionId)
  }

  async addToParticipantQueue(
    concertId: string,
    sessionId: string,
    currentTimeSeconds: number,
  ) {
    await this.redis.zadd(concertId + "-parti", currentTimeSeconds, sessionId)
  }

  async getMyReadyRank(concertId: string, sessionId: string): Promise<number | null> {
    const rank = await this.redis.zrank(concertId + "-ready", sessionId)
    return rank !== null ? rank + 1 : null
  }

  async getQueueSize(concertId: string): Promise<number> {
    const members = await this.redis.zrange(concertId, 0, -1)
    return members.length
  }

  async removeFromQueue(concertDatesId: string, sessionId: string) {
    await this.redis.zrem(concertDatesId + "-ready", sessionId)
  }
}
