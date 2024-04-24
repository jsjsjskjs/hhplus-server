import { Inject, Injectable } from "@nestjs/common"
import { BaseSeatRepository } from "@root/seat/repository/seat/seat.repository.abstract"
import { RedisService } from "@root/redis/redis.service"

@Injectable()
export class SeatService {
  constructor(
    @Inject("BaseSeatRepository") private readonly baseSeatRepo: BaseSeatRepository,
    private readonly redisService: RedisService,
  ) {}
  async getAllSeats(concertDatesId: string) {
    const allSeats = await this.baseSeatRepo.findAllByConcertDateId(concertDatesId)
    const
  }
}
