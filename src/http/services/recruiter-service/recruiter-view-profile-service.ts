import { PrismaRecruiterRepository } from "@/http/repositories/prisma/prisma-recruiter-repository";

export class RecruiterViewProfileService {
	constructor(
		private prismaRecruiterRepository: PrismaRecruiterRepository,
	) {}

	async execute(userId: string) {
		return await this.prismaRecruiterRepository.RecruiterViewProfile(userId);
	}
}