import { Response } from 'express';

export interface SmarteeResponse<T = unknown> {
  status: number;
  message: string;
  body: T;
}

export function success<T>(body: T, message = 'Success!'): SmarteeResponse<T> {
  return { status: 1, message, body };
}

export function failure(
  message: string,
  status = 0,
  body: unknown = null,
): SmarteeResponse {
  return { status, message, body };
}

export function sendSuccess<T>(res: Response, body: T, message = 'Success!') {
  return res.json(success(body, message));
}

export function sendFailure(
  res: Response,
  message: string,
  status = 0,
  body: unknown = null,
) {
  return res.json(failure(message, status, body));
}
