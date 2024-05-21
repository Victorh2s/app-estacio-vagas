import { PrismaProfileRepository } from "../repositories/prisma/prisma-profile-repository";
import { PrismaExperienceRepository } from "../repositories/prisma/prisma-exoerience-repository";
import { PrismaEducationRepository } from "../repositories/prisma/prisma-education-repository";
import { Location } from "@prisma/client";

export interface IntCreateProfileService {
		curse: string;
		type_curse: string;
		career_opportunity: string;
		experience: string;
		technical_skills: string[];
		education: string;
		professional_objective: string;
		salary_expectation: number;
		work_preference: Location[];
		profile_picture: string;
		cv_pdf: string;
		user_id: string;
}

export class CreateProfileService {
	constructor(
		private prismaProfileRepository: PrismaProfileRepository,
		private prismaExperience: PrismaExperienceRepository,
		private prismaEducation: PrismaEducationRepository
	) {}

  
	async execute(newProfile: IntCreateProfileService) {
	
		const {career_opportunity, curse, cv_pdf, professional_objective, profile_picture, salary_expectation, technical_skills, type_curse, user_id, work_preference} = newProfile;

		const createdProfile = await this.prismaProfileRepository.CreateProfile({
			profile_picture,
			curse,
			type_curse,
			salary_expectation,
			technical_skills,
			work_preference,
			career_opportunity,
			professional_objective,
			cv_pdf,
			user_id
		});

		console.log(createdProfile);











		return;
	}
}