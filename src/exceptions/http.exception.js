class HttpException extends Error {
    constructor(statusCode, message) {
      super(message);
      this.status = statusCode;
      this.message = message;
    }
  }
  
  export default HttpException;
  