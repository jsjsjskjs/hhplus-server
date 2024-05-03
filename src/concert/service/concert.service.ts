import { Inject, Injectable } from "@nestjs/common"
import { BaseConcertDatesRepository } from "@root/concert/repository/concert-dates/concert-dates.repository.abstract"

@Injectable()
export class ConcertService {
  constructor(
    @Inject("BaseConcertDatesRepository")
    private readonly baseConcertDatesRepository: BaseConcertDatesRepository,
  ) {}
}
