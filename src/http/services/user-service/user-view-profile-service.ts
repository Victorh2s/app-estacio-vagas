import { PrismaUserRepository } from "@/http/repositories/prisma/prisma-user-repository";




export class UserViewProfileService {
	constructor(
		private prismaUserRepository: PrismaUserRepository,
	) {}

  
	async execute(userId: string) {
		return await this.prismaUserRepository.UserViewProfile(userId);

	}
}