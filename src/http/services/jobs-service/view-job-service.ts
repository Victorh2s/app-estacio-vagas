import { PrismaJobRepository } from "@/http/repositories/prisma/prisma-job-repository";

export class ViewJobService {
	constructor(
		private prismaJobRepository: PrismaJobRepository,
	) {}

	async execute(job_id: string) {
		return await this.prismaJobRepository.ViewJob(job_id);
	}
}