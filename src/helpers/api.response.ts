import { HttpStatus } from '@nestjs/common';

export const ok = (message = 'Ok', data?) => {
  return {
    code: HttpStatus.OK,
    message,
    data,
  };
};

export const created = (message = 'Created', data?) => {
  return {
    code: HttpStatus.CREATED,
    message,
    data,
  };
};

export const update = (message = 'Successfully') => {
  return {
    code: HttpStatus.NO_CONTENT,
    message,
  };
};
