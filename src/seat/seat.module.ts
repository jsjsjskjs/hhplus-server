import { Module } from "@nestjs/common"
import { SeatController } from "./controller/seat.controller"
import { SeatService } from "./service/seat.service"
import { SeatRepository } from "@root/seat/repository/seat/seat.repository"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Seat } from "@root/seat/entites/seat.entity"
import { SeatGrade } from "@root/seat/entites/seat-grade.entity"
import { RedisModule } from "@root/redis/redis.module"
import { ClientModule } from "@root/client/client.module"
import { ReservationModule } from "@root/reservation/reservation.module"

@Module({
  imports: [
    RedisModule,
    ClientModule,
    ReservationModule,
    TypeOrmModule.forFeature([Seat, SeatGrade]),
  ],
  controllers: [SeatController],
  providers: [SeatService, { provide: "BaseSeatRepository", useClass: SeatRepository }],
  exports: [SeatService],
})
export class SeatModule {}
