import { Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common"
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { Seat } from "@root/seat/entites/seat.entity"
import { SeatService } from "@root/seat/service/seat.service"
import { AuthAndParti, AuthUser } from "@root/shared/decorator/auth-user.decorator"
import { AuthGuard, ParticipationGuard } from "@root/auth/auth.guard"
import { Reservation } from "@root/reservation/entites/reservation.entity"

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

  @AuthAndParti(AuthGuard, ParticipationGuard)
  @Post(":concertDatesId/seats/:seatId/completion")
  @ApiOperation({ summary: "좌석 예약 완료 요청" })
  @ApiResponse({ status: 201, type: () => Reservation })
  async completionSeat(
    @AuthUser() user,
    @Param("concertDatesId", ParseUUIDPipe) concertDatesId: string,
    @Param("seatId", ParseUUIDPipe) seatId: string,
  ) {
    return await this.seatService.completionSeat(concertDatesId, seatId, user.email)
  }
}
