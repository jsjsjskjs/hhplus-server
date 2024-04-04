import { ApiProperty } from "@nestjs/swagger"

export class OkResponseDto {
  @ApiProperty({ example: "ok" })
  message: string
}
