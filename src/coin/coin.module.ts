import { Module } from "@nestjs/common"
import { CoinController } from "./controller/coin.controller"
import { CoinService } from "./service/coin.service"

@Module({
  controllers: [CoinController],
  providers: [CoinService],
})
export class CoinModule {}
