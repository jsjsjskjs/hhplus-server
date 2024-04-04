import { BaseEntity, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { ApiProperty } from "@nestjs/swagger"
import { Exclude } from "class-transformer"

export class TimeStampEntity extends BaseEntity {
  @ApiProperty()
  @CreateDateColumn({ update: false })
  createdAt: string

  @ApiProperty()
  @UpdateDateColumn({ update: true })
  updatedAt: string

  @Exclude()
  @Column({ nullable: true })
  createdBy?: string

  @Exclude()
  @Column({ nullable: true })
  updatedBy?: string
}
