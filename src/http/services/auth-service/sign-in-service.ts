import { compare  } from "bcryptjs";
import { GenerateTokensService } from "../generate-token-service";
import { PrismaAuthRepository } from "@/http/repositories/prisma/prisma-auth-repository";

interface IntSignIn {
    email: string;
    password: string;
}

export class SignInService {
	constructor(
        private prismaAuthRepository: PrismaAuthRepository,
        private generateTokenService: GenerateTokensService
	) {}
  
	async execute( {email, password:pw} : IntSignIn) {

		if (!email || !pw) {
			throw new Error("Usuário ou senha inválido!");
		}

		const user = await this.prismaAuthRepository.GetUserByEmailSignIn(email);
      
		if (!user || !(await compare(pw, user.password))) {
			throw new Error("Usuário ou senha inválido!");
		}

		const { id } = user;

		const token = this.generateTokenService.execute(id);

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			token
		};
		
	}
}