import { HttpException, HttpStatus } from '@nestjs/common';

export const httpException = (messageError: string, statusCode: HttpStatus) => {
  throw new HttpException(messageError, statusCode);
};
