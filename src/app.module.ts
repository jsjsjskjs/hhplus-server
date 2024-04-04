import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ClientModule } from "./client/client.module"
import { CoinModule } from "./coin/coin.module"
import { ReservationModule } from "./reservation/reservation.module"
import { ConcertModule } from "./concert/concert.module"
import { SeatModule } from "./seat/seat.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ormConfig } from "@root/config/orm.config"

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    ClientModule,
    CoinModule,
    ReservationModule,
    ConcertModule,
    SeatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
