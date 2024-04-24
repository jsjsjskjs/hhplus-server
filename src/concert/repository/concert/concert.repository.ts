import { BaseConcertRepository } from "@root/concert/repository/concert/concert.repository.abstract"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Concert } from "@root/concert/entites/concert.entity"
import { EntityManager, Repository } from "typeorm"

@Injectable()
export class ConcertRepository implements BaseConcertRepository {
  constructor(@InjectRepository(Concert) private repository: Repository<Concert>) {}

  async findOneById(id: string, manager?: EntityManager) {
    const query = { where: { id } }
    if (manager) {
      return manager.findOne(Concert, query)
    } else {
      return this.repository.findOne(query)
    }
  }
}
