import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { TimeStampEntity } from "@root/shared/entity/time-stamp.entity"
import { ApiProperty } from "@nestjs/swagger"

@Entity()
export class Client extends TimeStampEntity {
  @ApiProperty({ type: String, format: "uuid" })
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ApiProperty({ type: String, format: "string" })
  @Column({ nullable: false })
  firstName: string

  @ApiProperty({ type: String, format: "string" })
  @Column({ nullable: false })
  lastName: string

  @ApiProperty({ type: String, format: "email" })
  @Column({ nullable: false })
  email: string

  @ApiProperty({ type: Number, default: 0 })
  @Column({ nullable: false, type: "float4", default: 0 })
  point: number

  @ApiProperty({ type: String, format: "string" })
  @Column({ nullable: false })
  password: string
}
