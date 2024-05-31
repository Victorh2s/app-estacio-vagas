import { PrismaRecruiterRepository } from "@/http/repositories/prisma/prisma-recruiter-repository";
import { IntRecruiterCreateJob } from "../../repositories/interfaces/int-job-repository";
import { PrismaJobRepository } from "../../repositories/prisma/prisma-job-repository";

export interface IntRecruiterCreateJobService extends IntRecruiterCreateJob{}

export class RecruiterCreateJobService {
	constructor(
		private prismaJobRepository: PrismaJobRepository,
		private prismaRecruiterRepository: PrismaRecruiterRepository
	) {}

  
	async execute(newJob: IntRecruiterCreateJobService, userId: string) {

		const recruiter = await this.prismaRecruiterRepository.RecruiterViewProfile(newJob.recruiter_profile_id);

		if(recruiter.user_id !== userId) throw new Error("Permissão negada: Este usuário não tem permissão para criar vagas em nome de outro recrutador");
		
		await this.prismaJobRepository.RecruiterCreateJob(newJob);

		return;
	}
}