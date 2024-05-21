import { NotFoundException } from "../../libs/exceptions/not-found-exception";
import { BadRequestException } from "../../libs/exceptions/bad-request-exception";
import { apiErrorMessages } from "../../libs/common/messages";
import { UserRepository } from "../users/repository";
import { ILogin } from "./interface";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { env } from "../../configs/env";

export class AuthService {
  constructor(
    private readonly userRepository = new UserRepository()
  ) {}
  async login(data: ILogin) {
    const user = await this.userRepository.getUserByEmail(data.email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const passwordMatched =  bcrypt.compare(data.password, user.password)
    if (!passwordMatched) {
      throw new BadRequestException(apiErrorMessages.invalidPassword)
    }
    const accessToken = this.generateAccessToken(user.id, user.email);
    return { accessToken }
  }

  generateAccessToken(id: number, email: string): string {
    const {secretKey, expiresIn } = env.jwt;
    const accessToken = jwt.sign({ id, email }, secretKey, { expiresIn });
  
    return accessToken;
  };
}