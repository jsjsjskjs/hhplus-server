import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { TimeStampEntity } from "@root/shared/entity/time-stamp.entity"
import { ApiProperty } from "@nestjs/swagger"
import { SeatGrade } from "@root/seat/entites/seat-grade.entity"
import { ConcertDates } from "@root/concert/entites/concert-dates.entity"

@Entity()
export class Seat extends TimeStampEntity {
  @ApiProperty({ type: String, format: "uuid" })
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ApiProperty({ type: String, format: "string" })
  @Column({ nullable: false })
  section: string

  @ApiProperty({ type: String, format: "string" })
  @Column({ nullable: false })
  row: string

  @ApiProperty({ type: Number })
  @Column({ type: "int", nullable: false })
  number: number

  @ApiProperty({ type: Boolean, default: false })
  @Column({ type: "boolean", nullable: false, default: false })
  isBooked: boolean

  @ApiProperty({ type: () => SeatGrade })
  @ManyToOne(() => SeatGrade, (seatGrade) => seatGrade.id, { nullable: false })
  @JoinColumn()
  seatGrade: SeatGrade

  @ApiProperty({ type: () => ConcertDates })
  @ManyToOne(() => ConcertDates, (concertDates) => concertDates.id, { nullable: false })
  @JoinColumn()
  concertDates: ConcertDates
}
