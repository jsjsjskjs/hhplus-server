import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { ApiProperty } from "@nestjs/swagger"
import { TimeStampEntity } from "@root/shared/entity/time-stamp.entity"

@Entity()
export class Concert extends TimeStampEntity {
  @ApiProperty({ type: String, format: "uuid" })
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ApiProperty({ type: String, format: "string" })
  @Column({ nullable: false })
  name: string

  @ApiProperty({ type: String, format: "string" })
  @Column({ nullable: false })
  artist: string

  @ApiProperty({ type: String, format: "string" })
  @Column({ nullable: false })
  venue: string

  @ApiProperty({ type: String, format: "string" })
  @Column({ nullable: false })
  description: string
}
