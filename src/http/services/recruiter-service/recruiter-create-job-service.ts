import { PrismaRecruiterRepository } from "@/http/repositories/prisma/prisma-recruiter-repository";
import { PrismaJobRepository } from "../../repositories/prisma/prisma-job-repository";
import { Location, StatusJob } from "@prisma/client";

export interface IntRecruiterCreateJobService{
	role_job: string, 
    company_job: string, 
    salary: number, 
    office_location: Location[],
	local: string | null,
    description: string, 
    requirements: string, 
    status_job: StatusJob
}

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