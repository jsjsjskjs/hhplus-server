import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { TimeStampEntity } from "@root/shared/entity/time-stamp.entity"
import { ApiProperty } from "@nestjs/swagger"
import { ReservationStatus } from "@root/reservation/enum/reservation.enum"
import { Client } from "@root/client/entites/client.entity"
import { Seat } from "@root/seat/entites/seat.entity"

@Entity()
export class Reservation extends TimeStampEntity {
  @ApiProperty({ type: String, format: "uuid" })
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ApiProperty({ type: String, format: "string" })
  @Column({ nullable: false })
  address: string

  @ApiProperty({ type: "enum", enum: ReservationStatus })
  @Column({
    type: "enum",
    enum: ReservationStatus,
    nullable: false,
    default: ReservationStatus.DONE,
  })
  status: ReservationStatus

  @ApiProperty({ type: () => Client })
  @ManyToOne(() => Client, (client) => client.id, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  client: Client

  @ApiProperty({ type: () => Seat })
  @ManyToOne(() => Seat, (seat) => seat.id, {
    nullable: false,
  })
  @JoinColumn()
  seat: Seat
}
