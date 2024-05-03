import { Module } from "@nestjs/common"
import { ReservationService } from "./service/reservation.service"
import { ReservationController } from "./controller/reservation.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Reservation } from "@root/reservation/entites/reservation.entity"
import { ReservationRepository } from "@root/reservation/repository/reservation.repository"

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  providers: [
    ReservationService,
    { provide: "BaseReservationRepository", useClass: ReservationRepository },
  ],
  controllers: [ReservationController],
  exports: [ReservationService],
})
export class ReservationModule {}
