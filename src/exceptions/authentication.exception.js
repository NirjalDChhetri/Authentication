class AuthenticationException extends Error {
    constructor(statusCode) {
        super("Unauthenticated")
        this.statusCode = statusCode;
        this.message = "Unauthenticated";
    }
}

export default AuthenticationException;