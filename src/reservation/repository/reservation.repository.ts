import { Injectable } from "@nestjs/common"
import { BaseReservationRepository } from "@root/reservation/repository/reservation.repository.abstract"
import { InjectRepository } from "@nestjs/typeorm"
import { Reservation } from "@root/reservation/entites/reservation.entity"
import { EntityManager, Repository } from "typeorm"
import { Seat } from "@root/seat/entites/seat.entity"
import { Client } from "@root/client/entites/client.entity"

@Injectable()
export class ReservationRepository implements BaseReservationRepository {
  constructor(
    @InjectRepository(Reservation) private repository: Repository<Reservation>,
  ) {}

  async findManyByClinetId(clientId: string, manager?: EntityManager) {
    const query = { where: { client: { id: clientId } } }
    if (manager) {
      return manager.find(Reservation, query)
    } else {
      return this.repository.find(query)
    }
  }

  async create(address: string, client: Client, seat: Seat, manager?: EntityManager) {
    const reservation = this.repository.create({ address, client, seat })
    if (manager) {
      return manager.save(reservation)
    } else {
      return this.repository.save(reservation)
    }
  }

  async findOneBySeatAndClient(client: Client, seat: Seat, manager?: EntityManager) {
    const query = { where: { client, seat } }
    if (manager) {
      return manager.findOne(Reservation, query)
    } else {
      return this.repository.findOne(query)
    }
  }
}
