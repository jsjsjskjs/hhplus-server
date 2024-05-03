import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CompletionSeatDto {
  @ApiProperty({ type: "string" })
  @IsNotEmpty()
  @IsString()
  address: string
}
