import { Inject, Injectable } from "@nestjs/common"
import { BaseReservationRepository } from "@root/reservation/repository/reservation.repository.abstract"
import { Client } from "@root/client/entites/client.entity"
import { Seat } from "@root/seat/entites/seat.entity"

@Injectable()
export class ReservationService {
  constructor(
    @Inject("BaseReservationRepository")
    private readonly baseReservationRepo: BaseReservationRepository,
  ) {}

  async create(address: string, client: Client, seat: Seat) {
    return await this.baseReservationRepo.create(address, client, seat)
  }

  async findOneBySeatAndClient(client: Client, seat: Seat) {
    return await this.baseReservationRepo.findOneBySeatAndClient(client, seat)
  }
}
