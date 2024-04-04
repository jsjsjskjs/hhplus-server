import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { TimeStampEntity } from "@root/shared/entity/time-stamp.entity"
import { ApiProperty } from "@nestjs/swagger"
import { SeatGradeName } from "@root/seat/enum/seat.enum"

@Entity()
export class SeatGrade extends TimeStampEntity {
  @ApiProperty({ type: String, format: "uuid" })
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ApiProperty({ type: "enum", enum: SeatGradeName })
  @Column({ type: "enum", enum: SeatGradeName, nullable: false })
  name: SeatGradeName

  @ApiProperty({ type: Number })
  @Column({ type: "float4", nullable: false })
  price: number
}
