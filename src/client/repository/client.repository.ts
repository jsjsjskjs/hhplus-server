import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Client } from "@root/client/entites/client.entity"
import { EntityManager, Repository } from "typeorm"
import { BaseClientRepository } from "@root/client/repository/client.repository.abstract"
import { CoinLog } from "@root/coin/entites/coin-log.entity"
import { CoinEventType } from "@root/coin/enum/coin.enum"
import { Reservation } from "@root/reservation/entites/reservation.entity"
import { Seat } from "@root/seat/entites/seat.entity"

@Injectable()
export class ClientRepository implements BaseClientRepository {
  constructor(@InjectRepository(Client) private repository: Repository<Client>) {}

  async findOneById(id: string, manager?: EntityManager) {
    const query = { where: { id } }
    if (manager) {
      return manager.findOne(Client, query)
    } else {
      return this.repository.findOne(query)
    }
  }

  async findOneByEmail(email: string, manager?: EntityManager) {
    const query = { where: { email } }
    if (manager) {
      return manager.findOne(Client, query)
    } else {
      return this.repository.findOne(query)
    }
  }

  async addPoint(clientId: string, point: number, manager: EntityManager) {
    const client = await manager.findOne(Client, {
      where: { id: clientId },
      lock: { mode: "pessimistic_write" },
    })
    const coinLog = new CoinLog()
    coinLog.client = client
    coinLog.point = point
    coinLog.eventType = CoinEventType.CHARGE
    await manager.save(CoinLog, coinLog)
    client.point += point
    return await manager.save(Client, client)
  }

  async usePoint(clientId: string, seat: Seat, address: string, manager: EntityManager) {
    const client = await manager.findOne(Client, {
      where: { id: clientId },
      lock: { mode: "pessimistic_write" },
    })
    if (client.point < seat.seatGrade.price) {
    }
    const reservation = new Reservation()
    reservation.client = client
    reservation.seat = seat
    reservation.address = address
    await manager.save(Reservation, reservation)

    const coinLog = new CoinLog()
    coinLog.client = client
    coinLog.point = seat.seatGrade.price
    coinLog.eventType = CoinEventType.REDUCE
    coinLog.reservation = reservation
    await manager.save(CoinLog, coinLog)
    client.point -= seat.seatGrade.price

    return await manager.save(Client, client)
  }
}
