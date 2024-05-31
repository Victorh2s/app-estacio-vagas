import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";



export class UserDeleteService {
	constructor(
		private prismaUserRepository: PrismaUserRepository,
	) {}

  
	async execute(userId: string) {
		return await this.prismaUserRepository.DeleteUser(userId);

	}
}