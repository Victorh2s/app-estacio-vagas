import { PrismaRecruiterRepository } from "@/http/repositories/prisma/prisma-recruiter-repository";
import { IntRecruiterCreateJob } from "../../repositories/interfaces/int-job-repository";
import { PrismaJobRepository } from "../../repositories/prisma/prisma-job-repository";

export interface IntRecruiterCreateJobService extends IntRecruiterCreateJob{}

export class RecruiterCreateJobService {
	constructor(
		private prismaJobRepository: PrismaJobRepository,
		private prismaRecruiterRepository: PrismaRecruiterRepository
	) {}

  
	async execute(data: IntRecruiterCreateJobService, userId: string) {

		const recruiterProfile = await this.prismaRecruiterRepository.RecruiterViewProfile(userId);
		
		const newJob = {
			recruiter_profile_id: recruiterProfile.id,
			...data
		};

		await this.prismaJobRepository.RecruiterCreateJob(newJob);

		return;
	}
}