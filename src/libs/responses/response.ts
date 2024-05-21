import { Response } from "express";
import { HttpCode } from "../common/enum";

export class ResponseBase {
  private statusCode: number;
  private message: string;
  private data: any;

  constructor() {
    this.statusCode = HttpCode.OK;
    this.message = 'success';
    this.data = {};
  }

  success(response: Response, data?: any) {
    return response.status(HttpCode.OK).json({
      statusCode: HttpCode.OK,
      message: 'success',
      data,
    });
  }

  error(response: Response, error: any) {
    const statusCode = error?.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
    const bodyError = {
      statusCode,
      messages: error?.message || 'Internal Server Error',
    };
    if (error && !error?.statusCode) {
      console.error('INTERNAL_SERVER_ERROR', error, new Date());
      bodyError.statusCode = 500;
      bodyError.messages = 'Internal Server Error';
    }
    return response.status(statusCode).json(bodyError);
  }
}
