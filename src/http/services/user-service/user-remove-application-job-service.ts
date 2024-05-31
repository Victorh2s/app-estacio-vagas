import { PrismaApplicationRepository } from "@/http/repositories/prisma/prisma-application-repository";

interface IntUserRemoveApplicationJobService {
    userId: string;
    applicationId: string;
}


export class UserRemoveApplicationJobService
{
	constructor(
		private prismaApplicationRepository: PrismaApplicationRepository,
	) {}

  
	async execute({applicationId, userId}: IntUserRemoveApplicationJobService) {

		const application = await this.prismaApplicationRepository.ViewApplication(applicationId);

		if(application.user_id !== userId) throw new Error("Permissão negada: Este usuário não tem permissão para cancelar essa candidatura!");

		await this.prismaApplicationRepository.RemoveApplication(applicationId);
		return;
	}
}