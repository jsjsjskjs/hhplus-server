import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common"
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { OkResponseDto } from "@root/shared/dto/base-ok.dto"
import { GetEntriesResDto } from "@root/client/dto/client.dto"

@Controller("client")
@ApiTags("client")
export class ClientController {
  constructor() {}

  @Post("me/queue/entries")
  @ApiHeader({
    name: "authorization", // 필요한 헤더의 이름
    description: "Authorization token", // 헤더에 대한 설명
    required: true, // 헤더가 필수인지 여부
  })
  @ApiHeader({
    name: "booking-session-id",
    description: "Booking session id",
    required: true,
  })
  @ApiOperation({ summary: "대기열 진입 요청" })
  @ApiResponse({ status: 201, type: OkResponseDto })
  enterEntries() {}

  @Get("me/queue/entries")
  @ApiHeader({
    name: "authorization", // 필요한 헤더의 이름
    description: "Authorization token", // 헤더에 대한 설명
    required: true, // 헤더가 필수인지 여부
  })
  @ApiHeader({
    name: "booking-session-id",
    description: "Booking session id",
    required: true,
  })
  @ApiOperation({ summary: "내 순서 조회" })
  @ApiResponse({ status: 200, type: GetEntriesResDto })
  getEntries() {}
}
