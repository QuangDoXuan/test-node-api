import { HttpCode } from "../common/enum";

export class HttpException extends Error {
  statusCode: number;
  message: string;
  constructor(statusCode = HttpCode.INTERNAL_SERVER_ERROR, message = 'Internal Server Error') {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}
