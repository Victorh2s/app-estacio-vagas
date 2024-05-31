import { IntCreateApplication } from "../../repositories/interfaces/int-application-repository";
import { PrismaApplicationRepository } from "../../repositories/prisma/prisma-application-repository";

interface IntUserApplicationJobService extends IntCreateApplication{}

export class UserApplicationJobService {
	constructor(
		private prismaApplicationRepository: PrismaApplicationRepository,
	) {}

  
	async execute({job_offer_id, user_id}: IntUserApplicationJobService ) {

		const data = {
			job_offer_id,
			user_id
		};
        
		return await this.prismaApplicationRepository.CreateApplication(data);

	}
}