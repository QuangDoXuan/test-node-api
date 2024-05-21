import { ICurrentUser } from "../../libs/common/interface";
import { BadRequestException } from "../../libs/exceptions/bad-request-exception";
import { IRegisterUser } from "./interface";
import { UserRepository } from "./repository";

export class UserService {
  constructor(
    private readonly userRepository = new UserRepository()
  ) {}
  async registerUser(data: IRegisterUser) {
    const user = await this.userRepository.getUserByEmail(data.email);
    if (user) {
      throw new BadRequestException('user exists');
    }
    return this.userRepository.create(data);
  }

  async getDetailUser(data: ICurrentUser) {
    // const user = await this.userRepository.getUserByEmail(data.email);
    // return user
    return
  }
}