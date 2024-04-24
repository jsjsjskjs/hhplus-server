import { ConcertDates } from "@root/concert/entites/concert-dates.entity"
import { EntityManager } from "typeorm"

export abstract class BaseConcertDatesRepository {
  abstract findOneById(id: string, manager?: EntityManager): Promise<ConcertDates>
}
