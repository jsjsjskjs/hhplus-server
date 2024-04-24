import { Injectable } from "@nestjs/common"
import { BaseSeatRepository } from "@root/seat/repository/seat/seat.repository.abstract"
import { InjectRepository } from "@nestjs/typeorm"
import { Seat } from "@root/seat/entites/seat.entity"
import { EntityManager, Repository } from "typeorm"

@Injectable()
export class SeatRepository implements BaseSeatRepository {
  constructor(@InjectRepository(Seat) private repository: Repository<Seat>) {}

  async findAllByConcertDateId(concertDatesId: string, manager?: EntityManager) {
    const query = {
      where: { concertDates: { id: concertDatesId } },
      relations: ["concertDates"],
    }
    if (manager) {
      return manager.find(Seat, query)
    } else {
      return this.repository.find(query)
    }
  }
}
