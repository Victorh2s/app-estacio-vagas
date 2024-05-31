import { PrismaJobRepository } from "@/http/repositories/prisma/prisma-job-repository";

export class ViewJobsService {
	constructor(
		private prismaJobRepository: PrismaJobRepository,
	) {}

	async execute() {
		return await this.prismaJobRepository.ViewJobs();
	}
}