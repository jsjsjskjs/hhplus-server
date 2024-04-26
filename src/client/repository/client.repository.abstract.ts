import { EntityManager } from "typeorm"
import { Client } from "@root/client/entites/client.entity"

export abstract class BaseClientRepository {
  abstract findOneById(id: string, manager?: EntityManager): Promise<Client>
  abstract findOneByEmail(email: string, manager?: EntityManager): Promise<Client>
}