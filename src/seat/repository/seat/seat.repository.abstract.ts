import { Seat } from "@root/seat/entites/seat.entity"
import { EntityManager } from "typeorm"

export abstract class BaseSeatRepository {
  abstract findAllByConcertDateId(
    concertDatesId: string,
    manager?: EntityManager,
  ): Promise<Seat[]>

  abstract findNotBookingByConcertDateId(
    concertDatesId: string,
    manager?: EntityManager,
  ): Promise<Seat[]>

  abstract findOneById(id: string, manager?: EntityManager): Promise<Seat>
}
