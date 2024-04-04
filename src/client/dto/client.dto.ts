import { GetEntriesType } from "@root/client/enum/client.enum"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class GetEntriesResDto {
  @ApiProperty({ enum: GetEntriesType })
  @IsNotEmpty()
  @IsEnum({ enum: GetEntriesType })
  type: GetEntriesType

  @ApiProperty({ type: "number" })
  @IsNotEmpty()
  @IsNumber()
  nowNumber: number

  @ApiPropertyOptional() @IsOptional() @IsString() token?: string
}
