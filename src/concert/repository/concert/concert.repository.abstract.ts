import { Concert } from "@root/concert/entites/concert.entity"
import { EntityManager } from "typeorm"

export abstract class BaseConcertRepository {
  abstract findOneById(id: string, manager?: EntityManager): Promise<Concert>
}
