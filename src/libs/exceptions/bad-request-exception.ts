import { HttpCode } from "../common/enum";
import { HttpException } from "./http-exception";

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(HttpCode.BAD_REQUEST, message)
  }
}
