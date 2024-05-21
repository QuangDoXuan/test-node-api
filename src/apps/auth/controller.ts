import { ResponseBase } from "../../libs/responses/response";
import { AuthService } from "./service";
import { Request, Response } from 'express';
import { validateLoginInput } from "./validator";

export class AuthController {
  constructor(
    private readonly authService = new AuthService(),
    private readonly response = new ResponseBase()
  ) {}

  async login(req: Request, res: Response) {
    try {
      const body = validateLoginInput(req.body)
      const data = await this.authService.login(body)
      return this.response.success(res, data);
    } catch(err) {
      return this.response.error(res, err)
    }
  }
}
