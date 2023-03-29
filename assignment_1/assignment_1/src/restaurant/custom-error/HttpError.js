class HttpError extends Error {
  constructor(message, httpStatusCode) {
    super(message);
    this.httpStatusCode = httpStatusCode; // http 상태코드
  }
}

module.exports = HttpError;
