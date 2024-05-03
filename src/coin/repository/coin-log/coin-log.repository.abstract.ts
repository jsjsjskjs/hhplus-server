import { CoinLog } from "@root/coin/entites/coin-log.entity"
import { Reservation } from "@root/reservation/entites/reservation.entity"
import { EntityManager } from "typeorm"
import { Client } from "@root/client/entites/client.entity"
import { CoinEventType } from "@root/coin/enum/coin.enum"

export abstract class BaseCoinLogRepository {
  abstract create(
    eventType: CoinEventType,
    point: number,
    client: Client,
    reservation?: Reservation,
    manager?: EntityManager,
  ): Promise<CoinLog>
}
