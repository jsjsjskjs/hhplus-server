import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { TimeStampEntity } from "@root/shared/entity/time-stamp.entity"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { CoinEventType } from "@root/coin/enum/coin.enum"
import { Client } from "@root/client/entites/client.entity"
import { Reservation } from "@root/reservation/entites/reservation.entity"

@Entity()
export class CoinLog extends TimeStampEntity {
  @ApiProperty({ type: String, format: "uuid" })
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ApiProperty({ type: "enum", enum: CoinEventType })
  @Column({ type: "enum", enum: CoinEventType, nullable: false })
  eventType: CoinEventType

  @ApiProperty({ type: Number, default: 0 })
  @Column({ nullable: false, type: "float4", default: 0 })
  point: number

  @ApiProperty({ type: () => Client })
  @ManyToOne(() => Client, (client) => client.id, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  client: Client

  @ApiPropertyOptional({ type: () => Reservation })
  @ManyToOne(() => Reservation, (reservation) => reservation.id, {
    nullable: true,
  })
  @JoinColumn()
  reservation?: Reservation
}
