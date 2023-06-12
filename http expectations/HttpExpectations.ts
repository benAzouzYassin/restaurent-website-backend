import { Response } from "express";
import { HttpStatusCodes } from "./httpStatusEnum";

type HttpStatus =
  | "CONTINUE"
  | "SWITCHING_PROTOCOLS"
  | "PROCESSING"
  | "EARLYHINTS"
  | "OK"
  | "CREATED"
  | "ACCEPTED"
  | "NON_AUTHORITATIVE_INFORMATION"
  | "NO_CONTENT"
  | "RESET_CONTENT"
  | "PARTIAL_CONTENT"
  | "AMBIGUOUS"
  | "MOVED_PERMANENTLY"
  | "FOUND"
  | "SEE_OTHER"
  | "NOT_MODIFIED"
  | "TEMPORARY_REDIRECT"
  | "PERMANENT_REDIRECT"
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "PAYMENT_REQUIRED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "METHOD_NOT_ALLOWED"
  | "NOT_ACCEPTABLE"
  | "PROXY_AUTHENTICATION_REQUIRED"
  | "REQUEST_TIMEOUT"
  | "CONFLICT"
  | "GONE"
  | "LENGTH_REQUIRED"
  | "PRECONDITION_FAILED"
  | "PAYLOAD_TOO_LARGE"
  | "URI_TOO_LONG"
  | "UNSUPPORTED_MEDIA_TYPE"
  | "REQUESTED_RANGE_NOT_SATISFIABLE"
  | "EXPECTATION_FAILED"
  | "I_AM_A_TEAPOT"
  | "MISDIRECTED"
  | "UNPROCESSABLE_ENTITY"
  | "FAILED_DEPENDENCY"
  | "PRECONDITION_REQUIRED"
  | "TOO_MANY_REQUESTS"
  | "INTERNAL_SERVER_ERROR"
  | "NOT_IMPLEMENTED"
  | "BAD_GATEWAY"
  | "SERVICE_UNAVAILABLE"
  | "GATEWAY_TIMEOUT"
  | "HTTP_VERSION_NOT_SUPPORTED";

export class HttpExpectation extends Error {
  constructor(
    readonly res: Response,
    httpStatus: HttpStatus,
    message?: string
  ) {
    super();
    this.message = message ?? httpStatus;

    res.status(HttpStatusCodes[httpStatus]).json({
      success: false,
      message: this.message,
      status: HttpStatusCodes[httpStatus],
    });
  }
}
