import { EntityManager } from "typeorm"
import { Reservation } from "@root/reservation/entites/reservation.entity"
import { Client } from "@root/client/entites/client.entity"
import { Seat } from "@root/seat/entites/seat.entity"

export abstract class BaseReservationRepository {
  abstract findManyByClinetId(
    clientId: string,
    manager?: EntityManager,
  ): Promise<Reservation[]>

  abstract create(
    address: string,
    client: Client,
    seat: Seat,
    manager?: EntityManager,
  ): Promise<Reservation>

  abstract findOneBySeatAndClient(
    client: Client,
    seat: Seat,
    manager?: EntityManager,
  ): Promise<Reservation>
}
