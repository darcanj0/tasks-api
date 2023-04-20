import {
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Result } from './result';

export const CheckResult = (result: Result<any>): void | never => {
  if (result.isSuccess) return;
  else {
    const statusCode = result.error.statusCode;
    const message = result.error.error;

    switch (statusCode) {
      case 404:
        throw new NotFoundException(message);
      case 422:
        throw new UnprocessableEntityException(message);
      case 400:
        throw new BadRequestException(message);
    }
  }
};

export interface IErrorMessage {
  error: string;
  statusCode: number;
}

export const INTERNAL_SERVER_ERROR: IErrorMessage = {
  error: 'Internal unhandled server error',
  statusCode: 500,
};

export const INVALID_USER_NAME: IErrorMessage = {
  error: 'Invalid User Name length. Must have between 3 and 20 letters',
  statusCode: 422,
};

export const INVALID_USER_EMAIL: IErrorMessage = {
  error: 'Email already in use',
  statusCode: 422,
};

export const INVALID_USER_NOT_FOUND: IErrorMessage = {
  error: 'User not found',
  statusCode: 404,
};
