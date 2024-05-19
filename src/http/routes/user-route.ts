import { Router } from "express";
import { SignUpController } from "../controllers/user-controllers/auth-controllers/sign-up-controller";
import { SignInController } from "../controllers/user-controllers/auth-controllers/sign-in-controller";


export const userRoute = Router();

userRoute.post("/register", SignUpController);
userRoute.post("/login", SignInController);
