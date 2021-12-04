import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

const getStatusAndMessageException = (exception: any) => {
  let message!: string;
  let status!: number;
  if (exception instanceof HttpException) {
    message = exception.message;
    status = exception.getStatus();
  } else {
    message = 'Internal error';
    status = HttpStatus.INTERNAL_SERVER_ERROR;
  }
  return { message, status };
};

const logging = (exception: any, req: Request) => {
  if (!(exception instanceof HttpException)) {
    const error = {
      error: exception?.message,
      method: req.method,
      body: req.body,
    };

    console.error(req.url, error);
  }
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { message, status } = getStatusAndMessageException(exception);

    logging(exception, request);

    response.status(status).json({
      code: status,
      message,
    });
  }
}
