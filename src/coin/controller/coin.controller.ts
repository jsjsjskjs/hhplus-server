import { Controller, Get, Post } from "@nestjs/common"
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { Client } from "@root/client/entites/client.entity"
import { CoinLog } from "@root/coin/entites/coin-log.entity"

@Controller("client")
@ApiTags("coin")
export class CoinController {
  constructor() {}

  @Get("me/coin")
  @ApiHeader({
    name: "authorization", // 필요한 헤더의 이름
    description: "Authorization token", // 헤더에 대한 설명
    required: true, // 헤더가 필수인지 여부
  })
  @ApiOperation({ summary: "내 코인 조회" })
  @ApiResponse({ status: 200, type: Client })
  getMyCoin() {}

  @Post("me/coin")
  @ApiHeader({
    name: "authorization", // 필요한 헤더의 이름
    description: "Authorization token", // 헤더에 대한 설명
    required: true, // 헤더가 필수인지 여부
  })
  @ApiOperation({ summary: "코인 충전" })
  @ApiResponse({ status: 201, type: CoinLog })
  chargeCoin() {}
}
