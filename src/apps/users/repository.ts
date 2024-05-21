import { User } from "../../libs/database/entities/user";
import { AbstractRepository } from "../../libs/database/abstracts/abstract-repository";

export class UserRepository extends AbstractRepository<User> {
  async create(data: Partial<User>) {
    const repo = await this.getRepo(User)
    const entity = repo.create(data)
    return repo.save(entity);
  }

  async getUserById(id: number) {
    const repo = await this.getRepo(User)
    return repo.findOne({ where: { id }})
  }

  async getUserByEmail(email: string) {
    const repo = await this.getRepo(User)
    return repo.findOne({ where: { email }})
  }
}