import { PrismaProfilesRepository } from "../repositories/prisma/prisma-profile-repository";
import { PrismaExperienceRepository } from "../repositories/prisma/prisma-experience-repository";
import { PrismaEducationRepository } from "../repositories/prisma/prisma-education-repository";
import { IntUserCreateProfileService } from "./interfaces-service";



export class UserCreateProfileService {
	constructor(
		private prismaProfilesRepository: PrismaProfilesRepository,
		private prismaExperienceRepository: PrismaExperienceRepository,
		private prismaEducationRepository: PrismaEducationRepository
	) {}

  
	async execute(newProfile: IntUserCreateProfileService) {
		const {career_opportunity, curse, cv_pdf, professional_objective, profile_picture, salary_expectation, technical_skills, type_curse, user_id, work_preference, experience, education} = newProfile;

		console.log(newProfile);
		const createdProfile = await this.prismaProfilesRepository.UserCreateProfile({
			profile_picture,
			curse,
			type_curse,
			salary_expectation,
			technical_skills,
			work_preference,
			career_opportunity,
			professional_objective,
			cv_pdf,
			user_id,
			experience,
			education
		});

		

		return createdProfile;
	}
}