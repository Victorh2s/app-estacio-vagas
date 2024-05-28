import { PrismaProfilesRepository } from "../repositories/prisma/prisma-profile-repository";
import { IntRecruiterCreateProfile } from "../repositories/interfaces/int-profile-repository";

export interface IntRecruiterCreateProfileService extends IntRecruiterCreateProfile{}

export class RecruiterCreateProfileService {
	constructor(
		private prismaProfilesRepository: PrismaProfilesRepository,
	) {}

  
	async execute(newRecruiterProfile: IntRecruiterCreateProfileService) {

		const createdProfile = await this.prismaProfilesRepository.RecruiterCreateProfile(newRecruiterProfile);

		return createdProfile;
	}
}