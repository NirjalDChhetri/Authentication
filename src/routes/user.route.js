import { Router } from "express";
import validator from "../middlewares/validation.middleware.js";
import { signupSchema, loginSchema } from "../validationSchemas/user.schema.js";
import UserController from "../controllers/user.controller.js";

const router = Router();

router
  .route("/signup")
  .post(validator(signupSchema), UserController.signup);

router.route("/login").post(validator(loginSchema), UserController.login);

export default router;
