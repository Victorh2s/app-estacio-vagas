

import { PrismaRecruiterRepository } from "@/http/repositories/prisma/prisma-recruiter-repository";
import { PrismaJobRepository } from "../../repositories/prisma/prisma-job-repository";




export class RecruiterDeleteJobService {
	constructor(
		private prismaJobRepository: PrismaJobRepository,
		private prismaRecruiterRepository: PrismaRecruiterRepository
	) {}

  
	async execute(job_id: string, userId: string) {

		const job = await this.prismaJobRepository.RecruiterViewUniqueJob(job_id);
		const recruiter = await this.prismaRecruiterRepository.RecruiterViewProfile(userId);

		if(recruiter.id !== job.recruiter_profile_id) throw new Error("Permissão negada: Este usuário não tem permissão para deletar essa vaga de emprego!");

		await this.prismaJobRepository.RecruiterDeleteJob(job_id);
		
		return;
	}
}