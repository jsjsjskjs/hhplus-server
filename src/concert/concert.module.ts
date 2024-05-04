import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Concert } from "@root/concert/entites/concert.entity"
import { ConcertDates } from "@root/concert/entites/concert-dates.entity"
import { ConcertDatesRepository } from "@root/concert/repository/concert-dates/concert-dates.repository"
import { ConcertDatesService } from "@root/concert/service/concert-dates.service"

@Module({
  imports: [ConcertModule, TypeOrmModule.forFeature([Concert, ConcertDates])],
  providers: [
    ConcertDatesService,
    { provide: "BaseConcertDatesRepository", useClass: ConcertDatesRepository },
  ],
  exports: [ConcertDatesService],
})
export class ConcertModule {}
