import { Controller, Get, Param, ParseUUIDPipe } from "@nestjs/common"
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { Seat } from "@root/seat/entites/seat.entity"
import { SeatService } from "@root/seat/service/seat.service"
import { AuthAndParti } from "@root/shared/decorator/auth-user.decorator"
import { AuthGuard, ParticipationGuard } from "@root/auth/auth.guard"

@Controller("concert-dates")
@ApiTags("seat")
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @AuthAndParti(AuthGuard, ParticipationGuard)
  @Get(":concertDatesId/seats")
  @ApiOperation({ summary: "좌석 목록 조회" })
  @ApiResponse({ status: 200, type: () => Seat, isArray: true })
  getAllSeats(@Param("concertDatesId", ParseUUIDPipe) concertDatesId: string) {
    return this.seatService.getAllSeats(concertDatesId)
  }
}
