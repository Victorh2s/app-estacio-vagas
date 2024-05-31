import { PrismaRecruiterRepository } from "@/http/repositories/prisma/prisma-recruiter-repository";
import { IntRecruiterCreateProfile } from "../../repositories/interfaces/int-recruiter-repository";

export interface IntRecruiterCreateProfileService extends IntRecruiterCreateProfile{}

export class RecruiterCreateProfileService {
	constructor(
		private prismaRecruiterRepository: PrismaRecruiterRepository,
	) {}

  
	async execute(newRecruiterProfile: IntRecruiterCreateProfileService) {

		await this.prismaRecruiterRepository.RecruiterCreateProfile(newRecruiterProfile);

		return;
	}
}