import { IntCreateUser } from "@/http/repositories/interfaces/int-user-repository";
import { PrismaUserRepository } from "@/http/repositories/prisma/prisma-user-repository";
import { hash } from "bcryptjs";




export class SignUpService {
	constructor(private prismaUserRepository: PrismaUserRepository ) {}
  
	async execute( data : IntCreateUser) {

		await this.prismaUserRepository.EmailAlreadyExist(data.email);
		await this.prismaUserRepository.CpfAlreadyExist(data.cpf);

		const passwordHash = await hash(data.password, 6);

		const nreUser = {
			name: data.name,
			email: data.email,
			password: passwordHash,
			cpf: data.cpf,
			estacio_student: data.estacio_student,
			role: data.role
		};

		await this.prismaUserRepository.CreateUser(nreUser);
		
		return;
	}
}