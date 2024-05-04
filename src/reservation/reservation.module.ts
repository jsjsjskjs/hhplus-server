import { Module } from "@nestjs/common"
import { ReservationService } from "./service/reservation.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Reservation } from "@root/reservation/entites/reservation.entity"
import { ReservationRepository } from "@root/reservation/repository/reservation.repository"

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  providers: [
    ReservationService,
    { provide: "BaseReservationRepository", useClass: ReservationRepository },
  ],
  exports: [ReservationService],
})
export class ReservationModule {}
