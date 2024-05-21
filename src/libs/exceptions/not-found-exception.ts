import { HttpCode } from "../common/enum";
import { HttpException } from "./http-exception";

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(HttpCode.NOT_FOUND, message)
  }
}
