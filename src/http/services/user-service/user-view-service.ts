
import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";



export class UsersViewService {
	constructor(
		private prismaUserRepository: PrismaUserRepository,
	) {}

	async execute() {
		return await this.prismaUserRepository.ViewUsers();
	}
}