import { PrismaUserRepository } from "@/http/repositories/prisma/prisma-user-repository";
import { GenerateTokensService } from "@/http/services/generate-token-service";
import { SignInService } from "@/http/services/sign-in-service";
import { Request, Response } from "express";

export async function SignInController(req: Request, res: Response){
	try {

		const data = req.body;

		const prismaUserRepository = new PrismaUserRepository();
		const generateTokenService =  new GenerateTokensService();
		const signInService = new SignInService(prismaUserRepository, generateTokenService);

		const token = await signInService.execute(data);

		return res.json(token).status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}