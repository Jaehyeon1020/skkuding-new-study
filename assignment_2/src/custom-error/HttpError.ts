class HttpError extends Error {
  constructor(message: string, private _httpStatusCode: number) {
    super(message);
  }

  get httpStatusCode() {
    return this._httpStatusCode;
  }

  set httpStatusCode(code: number) {
    this._httpStatusCode = code;
  }
}

export default HttpError;
