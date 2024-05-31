import { PrismaClient } from "@prisma/client";
import { IntCreateUser, IntPrismaAuthRepository } from "../interfaces/int-auth-repository";

const prisma = new PrismaClient();



export class PrismaAuthRepository implements IntPrismaAuthRepository{

	async GetUserByEmailSignIn(email: string) {
		const user = await prisma.user.findUnique({
			where: { email },
			select: {
				id: true,
				name: true,
				email: true,
				cpf: true,
				password: true,
				role: true,
				estacio_student: true,
			}
		});


		return user;
	}
	
	async CreateUser({name, email, cpf, estacio_student, password, role}: IntCreateUser){
		await prisma.user.create({
			data:{
				name, 
				email, 
				cpf, 
				estacio_student, 
				password, 
				role
			}
		});
		return; 
	}

	async VerifyUserExist(id: string) {
		const user = await prisma.user.findUnique({
			where:{
				id
			},
            
		});

		if(!user) {
			throw new Error("Esse usuário não existe.");
		}
        
		return;
	}

	async CpfAlreadyExist(cpf: string) {
		const cpf_already_exist = await prisma.user.findUnique({
			where:{
				cpf
			}
		});

		if(cpf_already_exist) throw new Error("Esse CPF já está cadastrado!");
        
		return;
	}

	async EmailAlreadyExist(email: string) {
		const email_already_exist = await prisma.user.findUnique({
			where:{
				email
			}
		});

		if(email_already_exist) throw new Error("Esse Email já está cadastrado!");
        
		return;
	}

	async GetUserWithPassword(id: string) {
		const user = await prisma.user.findUnique({
			where: { id },
		});

		return user;
	}

}