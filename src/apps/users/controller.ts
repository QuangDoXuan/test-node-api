import { UserService } from "./service";
import { Request, Response } from 'express';
import { validateRegisterUserInput } from "./validator";
import { ResponseBase } from "../../libs/responses/response";
import { AuthenticatedRequest } from "../../libs/common/interface";

export class UserController {
  constructor(
    private readonly userService = new UserService(),
    private readonly response = new ResponseBase()
  ) { }

  async register(req: Request, res: Response) {
    try {
      const body = validateRegisterUserInput(req.body)
      const { password, ...data } = await this.userService.registerUser(body)
      return this.response.success(res, data)
    } catch (err) {
      return this.response.error(res, err)
    }
  }

  async getProfile(req: AuthenticatedRequest, res: Response) {
    try {
      const data = await this.userService.getDetailUser(req.user)
      return this.response.success(res, data)
    } catch (err) {
      return this.response.error(res, err)
    }
  }
}
