import { PrismaRecruiterRepository } from "@/http/repositories/prisma/prisma-recruiter-repository";

export class RecruiterViewUniqueJobService {
	constructor(
		private prismaRecruiterRepository: PrismaRecruiterRepository,

	) {}

	async execute(job_id: string) {
		const recruiterProfile = await this.prismaRecruiterRepository.RecruiterViewProfile(job_id);

		const job = recruiterProfile.jobOffers.find((item) => item.id === job_id);

		if(!job) throw new Error("Essa vaga não foi encontrada no perfil do usuário!");

		return job;
	}
}