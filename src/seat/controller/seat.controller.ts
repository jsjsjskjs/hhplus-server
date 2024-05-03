import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common"
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { Seat } from "@root/seat/entites/seat.entity"
import { SeatService } from "@root/seat/service/seat.service"
import {
  AuthAndParti,
  AuthAndPartiAndSession,
  AuthSession,
  AuthUser,
} from "@root/shared/decorator/auth-user.decorator"
import { AuthGuard, ParticipationGuard, SessionIdGuard } from "@root/auth/auth.guard"
import { Reservation } from "@root/reservation/entites/reservation.entity"
import { CompletionSeatDto } from "@root/seat/dto/seat.dto"

@Controller("concert-dates")
@ApiTags("seat")
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @AuthAndParti(AuthGuard, ParticipationGuard)
  @Get(":concertDatesId/seats")
  @ApiOperation({ summary: "좌석 목록 조회" })
  @ApiResponse({ status: 200, type: () => Seat, isArray: true })
  async getAllSeats(@Param("concertDatesId", ParseUUIDPipe) concertDatesId: string) {
    return await this.seatService.getPossibleSeats(concertDatesId)
  }

  @AuthAndParti(AuthGuard, ParticipationGuard)
  @Post(":concertDatesId/seats/:seatId/booking")
  @ApiOperation({ summary: "좌석 예약 요청" })
  @ApiResponse({ status: 201, type: () => Seat })
  async bookingSeat(
    @AuthUser() user,
    @Param("concertDatesId", ParseUUIDPipe) concertDatesId: string,
    @Param("seatId", ParseUUIDPipe) seatId: string,
  ) {
    return await this.seatService.bookingSeat(concertDatesId, seatId, user.email)
  }

  @AuthAndPartiAndSession(AuthGuard, ParticipationGuard, SessionIdGuard)
  @Post(":concertDatesId/seats/:seatId/completion")
  @ApiOperation({ summary: "좌석 예약 완료 요청" })
  @ApiResponse({ status: 201, type: () => Reservation })
  async completionSeat(
    @AuthUser() user,
    @AuthSession() sessionId,
    @Param("concertDatesId", ParseUUIDPipe) concertDatesId: string,
    @Param("seatId", ParseUUIDPipe) seatId: string,
    @Body() dto: CompletionSeatDto,
  ) {
    return await this.seatService.completionSeat(
      concertDatesId,
      seatId,
      dto,
      user.email,
      sessionId,
    )
  }
}
