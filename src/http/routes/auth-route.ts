import { Router } from "express";
import { SignUpController } from "../controllers/auth-controller/sign-up-controller";
import { SignInController } from "../controllers/auth-controller/sign-in-controller";

export const authRoute = Router();

authRoute.post("/register", SignUpController);
authRoute.post("/login", SignInController);