import { ApiProperty } from "@nestjs/swagger"

export class PostReservationSeat400Dto {
  @ApiProperty({
    example: "해당 좌석은 이미 예매 중 입니다",
  })
  message: string

  @ApiProperty({
    example: "Bad Request",
  })
  error: string

  @ApiProperty({
    example: 400,
  })
  status: number
}

export class PostConfirmReservation400Dto {
  @ApiProperty({
    example: "보유하고 있는 Coin이 부족합니다",
  })
  message: string

  @ApiProperty({
    example: "Bad Request",
  })
  error: string

  @ApiProperty({
    example: 400,
  })
  status: number
}
