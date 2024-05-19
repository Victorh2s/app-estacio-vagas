import { Router } from "express";
import { SignUpController } from "../controllers/user-controllers/auth-controllers/sign-up-controller";


export const userRoute = Router();

userRoute.post("/register", SignUpController);