import { GenerateTokensService } from "@/http/services/generate-token-service";
import { SignInService } from "@/http/services/auth-service/sign-in-service";
import { Request, Response } from "express";
import { PrismaAuthRepository } from "@/http/repositories/prisma/prisma-auth-repository";

export async function SignInController(req: Request, res: Response){
	try {

		const data = req.body;

		const prismaAuthRepository = new PrismaAuthRepository();
		const generateTokenService =  new GenerateTokensService();
		const signInService = new SignInService(prismaAuthRepository, generateTokenService);

		const token = await signInService.execute(data);

		return res.json(token).status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}