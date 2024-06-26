import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";



export class UserViewService {
	constructor(
		private prismaUserRepository: PrismaUserRepository,
	) {}

  
	async execute(userId: string) {
		return await this.prismaUserRepository.ViewUser(userId);

	}
}