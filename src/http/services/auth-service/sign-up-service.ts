import { IntCreateUser } from "@/http/repositories/interfaces/int-auth-repository";
import { PrismaAuthRepository } from "@/http/repositories/prisma/prisma-auth-repository";
import { hash } from "bcryptjs";

export class SignUpService {
	constructor(private prismaAuthRepository: PrismaAuthRepository ) {}
  
	async execute( data : IntCreateUser) {

		await this.prismaAuthRepository.EmailAlreadyExist(data.email);
		await this.prismaAuthRepository.CpfAlreadyExist(data.cpf);

		const passwordHash = await hash(data.password, 6);

		const newUser = {
			name: data.name,
			email: data.email,
			password: passwordHash,
			cpf: data.cpf,
			estacio_student: data.estacio_student,
			role: data.role
		};

		await this.prismaAuthRepository.CreateUser(newUser);
		
		return;
	}
}