import { PrismaProfileRepository } from "../repositories/prisma/prisma-profile-repository";
import { PrismaExperienceRepository } from "../repositories/prisma/prisma-experience-repository";
import { PrismaEducationRepository } from "../repositories/prisma/prisma-education-repository";
import { Location } from "@prisma/client";

export interface IntCreateProfileService {
		curse: string;
		type_curse: string;
		career_opportunity: string;
		experience: IntExperience[];
		technical_skills: string;
		education: IntEducation[];
		professional_objective: string;
		salary_expectation: number;
		work_preference: Location[];
		profile_picture: string;
		cv_pdf: string;
		user_id: string;
}

export interface IntExperience {
	title: string;
	description: string;
}

export interface IntEducation {
	institution: string,
	type: string,
	startDate: string,
	endDate: string
	descriptionDegree: string,
}

export class CreateProfileService {
	constructor(
		private prismaProfileRepository: PrismaProfileRepository,
		private prismaExperience: PrismaExperienceRepository,
		private prismaEducation: PrismaEducationRepository
	) {}

  
	async execute(newProfile: IntCreateProfileService) {
		const {career_opportunity, curse, cv_pdf, professional_objective, profile_picture, salary_expectation, technical_skills, type_curse, user_id, work_preference, experience, education} = newProfile;

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

		await this.prismaProfileRepository.VerifyProfileExistById(createdProfile.id);

		if(experience.length !== 0) {
			for (const item of experience) {
				await this.prismaExperience.CreateExperienceInProfile({
					profile_id: createdProfile.id,
					title: item.title,
					description: item.description
				});
			}
		}

		if(education.length !== 0) {
			for (const item of education) {
				await this.prismaEducation.CreateEducationInProfile({
					profile_id: createdProfile.id,
					institution: item.institution,
					type: item.type,
					start_date: item.startDate,
					end_date: item.endDate,
					description_degree: item.descriptionDegree
				});
			}
		}

		return;
	}
}