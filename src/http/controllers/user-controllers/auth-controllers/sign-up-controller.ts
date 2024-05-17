import { PrismaUserRepository } from "@/http/repositories/prisma/prisma-user-repository";
import { z } from "zod";

export async function Sign_up_controller(req: Request, res: Response){
	try {
		const regexPassword = RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])");

		// model User {
		//     id          String  @id @default(auto()) @map("_id") @db.ObjectId
		//     name String
		//     email String @unique
		//     cpf Int @unique
		//     estacio_student Boolean
		//     password String 
		//     role Role @default(USER)
		//     profile Profile?
		//     recruiter_profile RecruiterProfile?
		//   }

		const registerBodySchema = z.object({
			name: z.string().max(50, "Nome deve conter até 50 caracteres!"),
			email: z.string().email("Email inválido"),
			cpf: z.string().refine((cpf) => {
				if (cpf.length !== 11) return false;
				if (/^(\d)\1{10}$/.test(cpf)) return false;
				const cpfNumeros = cpf.replace(/[^\d]/g, "");
				if(!/^\d{11}$/.test(cpfNumeros) ) return false;
			}),
			estacio_student: z.boolean(),
			password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres!").max(50, "A senha deve conter até 50 caracteres!").regex(regexPassword, "A senha deve conter pelo menos 1 letra maiúscula, 1 número e 1 caractere especial."),
			role: z.enum(["USER", "RECRUTER", "ADMIN"],{message:"O campo 'role' deve ser 'USER', 'RECRUTER' ou 'ADMIN'."})
		});   
        
        

		const {name, email, cpf, estacio_student, password, role} = registerBodySchema.parse(req.body);

		const prismaUserRepository = new PrismaUserRepository();
		const signUpService = new SignUpService(prismaUserRepository);

		await signUpService.execute({name, email, cpf, estacio_student, password, role});

	} catch (error) {
		return res.json({
			message: error.message
		}).status(400);
	}
}