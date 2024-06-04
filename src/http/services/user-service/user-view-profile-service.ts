import { PrismaUserRepository } from "@/http/repositories/prisma/prisma-user-repository";

export class UserViewProfileService {
	constructor(
		private prismaUserRepository: PrismaUserRepository,
	) {}

  
	async execute(userId: string) {
		const profile = await this.prismaUserRepository.UserViewProfile(userId);

		if(!profile) throw new Error("Esse usuário ainda não tem um perfil criado!");
		return; 
	}
}