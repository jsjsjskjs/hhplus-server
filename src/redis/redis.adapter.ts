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

  async removeFromReadyQueue(concertDatesId: string, sessionId: string) {
    await this.redis.zrem(concertDatesId + "-ready", sessionId)
  }

  async removeFromPartiQueue(concertDatesId: string, sessionId: string) {
    await this.redis.zrem(concertDatesId + "-parti", sessionId)
  }

  async removeExpiredParticipants(concertDatesId: string) {
    const currentTimeSeconds = Math.floor(Date.now() / 1000)
    const expiryTime = currentTimeSeconds - 480
    const expiredParticipants = await this.redis.zrangebyscore(
      concertDatesId + "-parti",
      "-inf",
      expiryTime,
    )
    if (expiredParticipants.length > 0) {
      await this.redis.zremrangebyscore(concertDatesId + "-parti", "-inf", expiryTime)
    }
    return expiredParticipants.length
  }

  async acquireSeatLock(key: string, ttl: number) {
    const result = await this.redis.set(key, "locked", "EX", ttl / 1000, "NX")
    return result !== null
  }

  async releaseSeatLock(key: string) {
    await this.redis.del(key)
  }

  async getKeysWithPrefix(prefix: string) {
    let cursor = "0"
    let keys: string[] = []
    do {
      const [newCursor, resultKeys] = await this.redis.scan(cursor, "MATCH", `${prefix}*`)
      cursor = newCursor
      keys = keys.concat(resultKeys)
    } while (cursor !== "0")
    return keys
  }
}
