import { Module } from "@nestjs/common"
import { RedisService } from "./redis.service"
import Redis from "ioredis"
import { redisConfig } from "@root/config/redis.config"
import { RedisAdapter } from "@root/redis/redis.adapter"

@Module({
  providers: [
    RedisService,
    {
      provide: "REDIS_CLIENT",
      useFactory: () => {
        return new Redis(redisConfig)
      },
    },
    { provide: "BaseRedisAdapter", useClass: RedisAdapter },
  ],
  exports: ["REDIS_CLIENT", RedisService],
})
export class RedisModule {}
