import { Inject, Injectable } from "@nestjs/common"
import { BaseConcertDatesRepository } from "@root/concert/repository/concert-dates/concert-dates.repository.abstract"

@Injectable()
export class ConcertDatesService {
  constructor(
    @Inject("BaseConcertDatesRepository")
    private readonly baseConcertDatesRepository: BaseConcertDatesRepository,
  ) {}
  async findOneById(id: string) {
    return await this.baseConcertDatesRepository.findOneById(id)
  }
}
