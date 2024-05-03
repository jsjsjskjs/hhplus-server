import { Module } from "@nestjs/common"
import { ConcertService } from "./service/concert.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Concert } from "@root/concert/entites/concert.entity"
import { ConcertDates } from "@root/concert/entites/concert-dates.entity"
import { BaseConcertRepository } from "@root/concert/repository/concert/concert.repository.abstract"
import { ConcertRepository } from "@root/concert/repository/concert/concert.repository"
import { ConcertDatesRepository } from "@root/concert/repository/concert-dates/concert-dates.repository"
import { ConcertDatesService } from "@root/concert/service/concert-dates.service"

@Module({
  imports: [ConcertModule, TypeOrmModule.forFeature([Concert, ConcertDates])],
  providers: [
    ConcertService,
    ConcertDatesService,
    { provide: "BaseConcertRepository", useClass: ConcertRepository },
    { provide: "BaseConcertDatesRepository", useClass: ConcertDatesRepository },
  ],
  exports: [ConcertService, ConcertDatesService],
})
export class ConcertModule {}
