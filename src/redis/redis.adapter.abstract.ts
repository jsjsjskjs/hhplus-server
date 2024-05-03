export abstract class BaseRedisAdapter {
  abstract addToReadyQueue(
    concertId: string,
    sessionId: string,
    currentTimeSeconds: number,
  ): Promise<void>

  abstract addToParticipantQueue(
    concertId: string,
    sessionId: string,
    currentTimeSeconds: number,
  ): Promise<void>

  abstract getMyReadyRank(concertId: string, sessionId: string): Promise<number | null>

  abstract getQueueSize(concertId: string): Promise<number>

  abstract removeFromReadyQueue(concertDatesId: string, sessionId: string): Promise<void>

  abstract removeFromPartiQueue(concertDatesId: string, sessionId: string): Promise<void>

  abstract removeExpiredParticipants(concertDatesId: string): Promise<number>

  abstract acquireSeatLock(key: string, ttl: number): Promise<boolean>

  abstract relaseSeatLock(key: string): Promise<void>

  abstract getKeysWithPrefix(prefix: string): Promise<string[]>
}
