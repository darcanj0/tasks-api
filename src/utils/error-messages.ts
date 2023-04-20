import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Result } from './result';

export const CheckResult = (result: Result<any>): any | never => {
  if (result.isSuccess) return result.getResult;
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
      case 500:
        throw new InternalServerErrorException(message);
      case 401:
        throw new UnauthorizedException(message);
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

export const INVALID_AUTH: IErrorMessage = {
  error: 'User auth is invalid',
  statusCode: 401,
};

export const INVALID_TOKEN_NOT_SENT: IErrorMessage = {
  error: 'Bearer token was not sent',
  statusCode: 401,
};

export const INVALID_AMMOUNT_TAGS: IErrorMessage = {
  error: 'Task can have up to 5 tags',
  statusCode: 422,
};

export const INVALID_TAG_NOT_FOUND: IErrorMessage = {
  error: 'Tag not found',
  statusCode: 404,
};

export const INVALID_TAG_CREATOR: IErrorMessage = {
  error: 'Tag does not belong to user',
  statusCode: 403,
};
