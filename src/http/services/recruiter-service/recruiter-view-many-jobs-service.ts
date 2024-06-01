import { PrismaRecruiterRepository } from "@/http/repositories/prisma/prisma-recruiter-repository";

export class RecruiterViewManyJobService {
	constructor(
		private prismaRecruiterRepository: PrismaRecruiterRepository
	) {}

  
	async execute(userId: string) {
		const jobs = await this.prismaRecruiterRepository.RecruiterViewProfile(userId);

		return jobs.jobOffers;
	}
}