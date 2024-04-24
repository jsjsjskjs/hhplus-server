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

  abstract removeFromQueue(concertDatesId: string, sessionId: string): Promise<void>
}
