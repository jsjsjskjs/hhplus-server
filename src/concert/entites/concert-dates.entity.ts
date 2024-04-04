import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { ApiProperty } from "@nestjs/swagger"
import { TimeStampEntity } from "@root/shared/entity/time-stamp.entity"
import { Concert } from "@root/concert/entites/concert.entity"

@Entity()
export class ConcertDates extends TimeStampEntity {
  @ApiProperty({ type: String, format: "uuid" })
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ApiProperty({ type: "timestamp", nullable: false })
  @Column({ nullable: false })
  concertDate: Date

  @ApiProperty({ type: "timestamp", nullable: false })
  @Column({ nullable: false })
  reserveDate: Date

  @ApiProperty({ type: () => Concert })
  @ManyToOne(() => Concert, (concert) => concert.id, { nullable: false })
  @JoinColumn()
  concert: Concert
}
