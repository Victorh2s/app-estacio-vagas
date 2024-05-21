import { PrismaUserRepository } from "@/http/repositories/prisma/prisma-user-repository";
import { SignUpService } from "@/http/services/sign-up-service";
import { Request, Response } from "express";
import { ZodError, z } from "zod";

export async function SignUpController(req: Request, res: Response){
	try {
		const regexPassword = RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])");

		const registerBodySchema = z.object({
			name: z.string().max(50, "Nome deve conter até 50 caracteres!"),
			email: z.string().email("Email inválido"),
			cpf: z.string().min(11, "CPF inválido!"),
			estacio_student: z.boolean(),
			password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres!").max(50, "A senha deve conter até 50 caracteres!").regex(regexPassword, "A senha deve conter pelo menos 1 letra maiúscula, 1 número e 1 caractere especial."),
			role: z.enum(["USER", "RECRUTER", "ADMIN"],{message:"O campo 'role' deve ser 'USER', 'RECRUTER' ou 'ADMIN'."})
		});   

		const data = registerBodySchema.parse(req.body);

		const prismaUserRepository = new PrismaUserRepository();
		const signUpService = new SignUpService(prismaUserRepository);

		await signUpService.execute(data);

		return res.json("Usuário criado com sucesso!").status(200);

	} catch (error:any) {
		if (error instanceof ZodError) {
			return res.status(400).json({ message: error.format() }); 
		} else {
			console.error(error);
			return res.status(500).json({ message: error.message });
		}
	}
}