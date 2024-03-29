import UserService from "../services/user.service.js";
import successResponse from "../utils/successResponse.js";

class UserController {
  async signup(req, res, next) {
    try {
      const user = await UserService.create(req.body);
      successResponse(res, true, user, "User Created succcessfullly");
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      if (req.file) {
        req.body.profilePic = req.file.path;
      }
      const userData = await UserService.update(req.body, req.user);
      successResponse(res, 200, userData, "User updated");
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const data = await UserService.login(req.body);
      successResponse(res, 200, data, "Logged in Successfully");
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async changePassword(req, res, next) {
    try {
      const userData = await UserService.changePassword(req.body);
      successResponse(res, 200, userData, "Password Changed");
    } catch (err) {
      next(err);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const response = await UserService.forgotPassword(
        req.headers.host,
        req.body
      );
      successResponse(res, 200, response, "Reset Email");
    } catch (err) {
      next(err);
    }
  }

  async verifyToken(req, res, next) {
    try {
      const id = req.params.id;
      const token = req.params.token;
      req.body.token = token;
      const response = await UserService.verifyToken(req.body, id);
      successResponse(res, 200, response, "Valid Url");
    } catch (err) {
      next(err);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const id = req.params.id;
      const token = req.params.token;
      req.body.token = token;
      const response = await UserService.resetPassword(req.body, id);
      successResponse(res, 200, response, "Password changed");
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
