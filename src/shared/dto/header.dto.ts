// HeaderDto.ts
import { IsString } from "class-validator"

export class OnlyAuthDto {
  @IsString()
  readonly "Authorization": string
}

export class ParticipationAuthDto {
  @IsString()
  readonly "Authorization": string

  @IsString()
  readonly "Participation-Token": string
}
