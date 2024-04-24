import { Injectable } from "@nestjs/common"
import { BaseConcertDatesRepository } from "@root/concert/repository/concert-dates/concert-dates.repository.abstract"
import { InjectRepository } from "@nestjs/typeorm"
import { ConcertDates } from "@root/concert/entites/concert-dates.entity"
import { EntityManager, Repository } from "typeorm"

@Injectable()
export class ConcertDatesRepository implements BaseConcertDatesRepository {
  constructor(
    @InjectRepository(ConcertDates) private repository: Repository<ConcertDates>,
  ) {}

  async findOneById(id: string, manager?: EntityManager) {
    const query = { where: { id } }
    if (manager) {
      return manager.findOne(ConcertDates, query)
    } else {
      return this.repository.findOne(query)
    }
  }
}
