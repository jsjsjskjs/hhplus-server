import { EntityManager } from "typeorm"
import { Client } from "@root/client/entites/client.entity"
import { Reservation } from "@root/reservation/entites/reservation.entity"
import { Seat } from "@root/seat/entites/seat.entity"

export abstract class BaseClientRepository {
  abstract findOneById(id: string, manager?: EntityManager): Promise<Client>
  abstract findOneByEmail(email: string, manager?: EntityManager): Promise<Client>
  abstract addPoint(
    clientId: string,
    point: number,
    manager: EntityManager,
  ): Promise<Client>
  abstract usePoint(
    clientId: string,
    seat: Seat,
    address: string,
    manager: EntityManager,
  ): Promise<Client>
}
