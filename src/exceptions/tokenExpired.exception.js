class tokenExpiredException extends Error {
  constructor() {
    super("Token Expired");
    this.status = 403;
    this.message = "Token Expired";
  }
}

export default tokenExpiredException;
