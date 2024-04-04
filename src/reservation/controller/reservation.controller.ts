import { Controller, Post } from "@nestjs/common"
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { OkResponseDto } from "@root/shared/dto/base-ok.dto"
import {
  PostConfirmReservation400Dto,
  PostReservationSeat400Dto,
} from "@root/reservation/dto/reservation.dto"
import { Reservation } from "@root/reservation/entites/reservation.entity"

@Controller("reservation")
@ApiTags("reservation")
export class ReservationController {
  constructor() {}
  @Post("/seats")
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
  @ApiOperation({ summary: "좌석 예약 요청" })
  @ApiResponse({ status: 200, type: OkResponseDto })
  @ApiResponse({
    status: 400,
    type: PostReservationSeat400Dto,
    description: "해당 좌석에 선점권이 없는 경우",
  })
  reserveSeats() {}

  @Post("/confirm")
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
  @ApiOperation({ summary: "예매 정보 입력 및 결제" })
  @ApiResponse({ status: 200, type: Reservation })
  @ApiResponse({
    status: 400,
    type: PostConfirmReservation400Dto,
    description: "보유하고 있는 Coin이 부족한 경우",
  })
  confirmReservation() {}
}
