import { Inject, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Client } from "@root/client/entites/client.entity"
import { EntityManager, Repository } from "typeorm"
import { BaseClientRepository } from "@root/client/repository/client.repository.abstract"

@Injectable()
export class ClientRepository implements BaseClientRepository {
  constructor(@InjectRepository(Client) private repository: Repository<Client>) {}

  async findOneById(id: string, manager?: EntityManager) {
    const query = { where: { id } }
    if (manager) {
      return manager.findOne(Client, query)
    } else {
      return this.repository.findOne(query)
    }
  }

  async findOneByEmail(email: string, manager?: EntityManager) {
    const query = { where: { email } }
    if (manager) {
      return manager.findOne(Client, query)
    } else {
      return this.repository.findOne(query)
    }
  }
}
