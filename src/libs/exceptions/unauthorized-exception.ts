
import { HttpCode } from "../common/enum";
import { HttpException } from "./http-exception";

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(HttpCode.UNAUTHORIZED, message)
  }
}
