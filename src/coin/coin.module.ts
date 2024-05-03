import { Module } from "@nestjs/common"
import { CoinController } from "./controller/coin.controller"
import { CoinLogService } from "./service/coin-log.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CoinLog } from "@root/coin/entites/coin-log.entity"
import { CoinLogRepository } from "@root/coin/repository/coin-log/coin-log.repository"

@Module({
  imports: [TypeOrmModule.forFeature([CoinLog])],
  controllers: [CoinController],
  providers: [
    CoinLogService,
    { provide: "BaseCoinLogRepository", useClass: CoinLogRepository },
  ],
  exports: [CoinLogService],
})
export class CoinModule {}
