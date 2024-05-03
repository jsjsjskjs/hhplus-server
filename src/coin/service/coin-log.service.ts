import { Inject, Injectable } from "@nestjs/common"
import { BaseCoinLogRepository } from "@root/coin/repository/coin-log/coin-log.repository.abstract"

@Injectable()
export class CoinLogService {
  constructor(
    @Inject("BaseCoinLogRepository")
    private readonly baseCoinLogRepo: BaseCoinLogRepository,
  ) {}
}
