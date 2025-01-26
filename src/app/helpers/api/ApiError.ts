import { composeErrorMessage } from "./ErrorCodeMapping";

export class ApiError extends Error {
  url: string;
  code: string;
  status: number;
  errors: Array<{ field: string; messages: string[] }>;

  constructor({ url, code, status, errors = [], message }: {
    url: string;
    code: string;
    status: number;
    errors: Array<{ field: string; messages: string[] }>;
    message: string;
  }) {
    super(composeErrorMessage(status, code, message));
    this.url = url;
    this.code = code;
    this.status = status;
    this.errors = errors;
  }

  resourceNotFound() {
    return this.status === 404;
  }

  unauthorized() {
    return this.status === 401;
  }

  getFieldErrorMessage(fieldName: string) {
    if (Array.isArray(this.errors)) {
      const errorInfo = this.errors.find((error) => {
        return error.field === fieldName;
      });

      return errorInfo ? errorInfo.messages.join(",") : null;
    }

    return null;
  }
}
