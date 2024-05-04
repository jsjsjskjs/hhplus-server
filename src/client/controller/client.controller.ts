import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common"
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { OkResponseDto } from "../../shared/dto/base-ok.dto"
import {
  EnterEntriesDto,
  GetEntriesResDto,
  PatchPointDto,
} from "../../client/dto/client.dto"
import { AuthGuard, SessionIdGuard } from "../../auth/auth.guard"
import {
  Auth,
  AuthAndSession,
  AuthSession,
  AuthUser,
} from "../../shared/decorator/auth-user.decorator"
import { ClientService } from "../../client/service/client.service"
import { Client } from "../../client/entites/client.entity"

@Controller("client")
@ApiTags("client")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post("me/queue/entries")
  @AuthAndSession(AuthGuard, SessionIdGuard)
  @ApiHeader({
    name: "booking-session-id",
    description: "Booking session id",
    required: true,
  })
  @ApiOperation({ summary: "대기열 진입 요청" })
  @ApiResponse({ status: 201, type: OkResponseDto })
  async enterEntries(
    @AuthUser() user,
    @AuthSession() sessionId,
    @Body() dto: EnterEntriesDto,
  ) {
    return await this.clientService.enterEntries(user.email, sessionId, dto)
  }

  @Get("me/queue/entries/:concertDatesId")
  @AuthAndSession(AuthGuard, SessionIdGuard)
  @ApiHeader({
    name: "booking-session-id",
    description: "Booking session id",
    required: true,
  })
  @ApiOperation({ summary: "내 순서 조회" })
  @ApiResponse({ status: 200, type: GetEntriesResDto })
  async getEntries(
    @AuthUser() user,
    @AuthSession() sessionId,
    @Param("concertDatesId") concertDatesId: string,
  ) {
    return await this.clientService.getEntries(user.email, sessionId, concertDatesId)
  }

  @Get("me/point")
  @Auth(AuthGuard)
  @ApiOperation({ summary: "포인트 조회" })
  @ApiResponse({ status: 200, type: Client })
  async getPoint(@AuthUser() user) {
    return await this.clientService.findPoint(user.id)
  }

  @Patch("me/point/deposit")
  @Auth(AuthGuard)
  @ApiOperation({ summary: "포인트 적립" })
  @ApiResponse({ status: 200, type: Client })
  async addPoint(@AuthUser() user, @Body() dto: PatchPointDto) {
    return await this.clientService.addPoint(user.id, dto.amount)
  }
}
