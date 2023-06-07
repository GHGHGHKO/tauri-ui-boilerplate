export interface TenorError {
  error: Errors;
}

export interface Errors {
  code: string;
  message: string;
  status: string;
}
