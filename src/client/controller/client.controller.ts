import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { OkResponseDto } from "@root/shared/dto/base-ok.dto"
import { EnterEntriesDto, GetEntriesResDto } from "@root/client/dto/client.dto"
import { AuthGuard, SessionIdGuard } from "@root/auth/auth.guard"
import {
  Auth,
  AuthAndSession,
  AuthSession,
  AuthUser,
} from "@root/shared/decorator/auth-user.decorator"
import { ClientService } from "@root/client/service/client.service"
import { Client } from "@root/client/entites/client.entity"

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
}
