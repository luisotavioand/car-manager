import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
import HttpException from './/HttpException';

export function validationMiddleware<T> (type: any): express.RequestHandler {
    return async (req, res, next) => {
      validate(plainToClass(type, req.body))
        .then( async(errors: ValidationError[]) => {
          if (errors.length > 0) {
            const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
            next(new HttpException(400, message,''));
          } else {
            next();
          }
      });
    };
  }