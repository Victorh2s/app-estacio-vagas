import { Router } from "express";
import { SignUpController } from "../controllers/sign-up-controller";
import { SignInController } from "../controllers/sign-in-controller";


export const userRoute = Router();

userRoute.post("/register", SignUpController);
userRoute.post("/login", SignInController);
