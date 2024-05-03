import { BaseCoinLogRepository } from "@root/coin/repository/coin-log/coin-log.repository.abstract"
import { InjectRepository } from "@nestjs/typeorm"
import { CoinLog } from "@root/coin/entites/coin-log.entity"
import { EntityManager, Repository } from "typeorm"
import { Injectable } from "@nestjs/common"
import { CoinEventType } from "@root/coin/enum/coin.enum"
import { Client } from "@root/client/entites/client.entity"
import { Reservation } from "@root/reservation/entites/reservation.entity"

@Injectable()
export class CoinLogRepository implements BaseCoinLogRepository {
  constructor(@InjectRepository(CoinLog) private repository: Repository<CoinLog>) {}

  async create(
    eventType: CoinEventType,
    point,
    client: Client,
    reservation?: Reservation,
    manager?: EntityManager,
  ) {
    const coinLog = this.repository.create({ eventType, point, client, reservation })
    if (manager) {
      return manager.save(coinLog)
    } else {
      return this.repository.save(coinLog)
    }
  }
}
