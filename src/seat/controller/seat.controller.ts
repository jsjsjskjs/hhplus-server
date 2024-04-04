import { Controller, Get, Param, ParseUUIDPipe } from "@nestjs/common"
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { Seat } from "@root/seat/entites/seat.entity"

@Controller("concert-dates")
@ApiTags("seat")
export class SeatController {
  constructor() {}
  @Get(":concertDatesId/seats")
  @ApiHeader({
    name: "authorization", // 필요한 헤더의 이름
    description: "Authorization token", // 헤더에 대한 설명
    required: true, // 헤더가 필수인지 여부
  })
  @ApiHeader({
    name: "participation-token",
    description: "Participation token",
    required: true,
  })
  @ApiOperation({ summary: "좌석 목록 조회" })
  @ApiResponse({ status: 200, type: () => Seat, isArray: true })
  getAllSeats(@Param("concertDatesId", ParseUUIDPipe) concertDatesId: string) {}
}
