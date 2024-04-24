import { Module } from "@nestjs/common"
import { ClientController } from "./controller/client.controller"
import { ClientService } from "./service/client.service"
import { ClientRepository } from "@root/client/repository/client.repository"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Client } from "@root/client/entites/client.entity"
import { RedisModule } from "@root/redis/redis.module"
import { ConcertModule } from "@root/concert/concert.module"
import { AuthModule } from "@root/auth/auth.module"

@Module({
  imports: [TypeOrmModule.forFeature([Client]), ConcertModule, RedisModule, AuthModule],
  controllers: [ClientController],
  providers: [
    ClientService,
    { provide: "BaseClientRepository", useClass: ClientRepository },
  ],
  exports: [ClientService],
})
export class ClientModule {}
