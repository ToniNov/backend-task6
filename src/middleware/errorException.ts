import {ErrorCode} from "./errorCode";

export class ErrorException extends Error {
  public status: number | null = null;
  public metaData: any = null;
  constructor(code: string = ErrorCode.UnknownError, metaData: any = null) {
    super(code);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = code;
    this.status = 400;
    this.metaData = metaData;
    switch (code) {
      case ErrorCode.Unauthenticated:
      case ErrorCode.Blocked:
        this.status = 401;
        break;
      case ErrorCode.MaximumAllowedGrade:
      case ErrorCode.DuplicateEntityError:
        this.status = 400;
        break;
      case ErrorCode.AsyncError:
        this.status = 400;
        break;
      case ErrorCode.NotFound:
        this.status = 404;
        break;
      default:
        this.status = 400;
        break;
    }
  }
}
