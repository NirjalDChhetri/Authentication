import Jwt from "jsonwebtoken";
import user from "../config/database.config";
import AuthenticationException from "../exceptions/authentication.exception";
import tokenExpiredException from "../exceptions/tokenExpired.exception";

const authenticationMiddleware = async (req, res, next) => {
  try {
    if (
      req.headers.authorization === null ||
      req.headers.authorization === undefined
    ) {
      throw new AuthenticationException();
    }
    const token = req.headers.authorization.split(" ")[1];

    const decoded = Jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);

    if (decoded.exp * 1000 < Date.now()) {
      throw new tokenExpiredException();
    }
    const _user = await user.findByPk(decoded.sub);
    if (_user === null || _user === undefined) {
      throw new AuthenticationException();
    }
    req.user = _user;
    // `user` is authorized pass the control to next middleware
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default authenticationMiddleware;
