import { Router } from "express";
import validator from "../middlewares/validation.middleware.js";
import { signupSchema, loginSchema, forgotPasswordSchema, resetSchema, tokenSchema } from "../validationSchemas/user.schema.js";
import UserController from "../controllers/user.controller.js";

const router = Router();

router
  .route("/signup")
  .post(validator(signupSchema), UserController.signup);

router.route("/login").post(validator(loginSchema), UserController.login);

router.route("/forgotPassword").post(validator(forgotPasswordSchema), UserController.forgotPassword);

router.route("/verify/:id/:token").get( UserController.verifyToken);

router.route("/reset/:id/:token").post(validator(resetSchema), UserController.resetPassword);

export default router;
