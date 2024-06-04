import { PrismaUserRepository } from "@/http/repositories/prisma/prisma-user-repository";
import { IntUserCreateProfileService } from "../interfaces-services";



export class UserCreateProfileService {
	constructor(
		private prismaUserRepository: PrismaUserRepository,
	) {}

  
	async execute(newProfile: IntUserCreateProfileService) {
		const {career_opportunity, curse, cv_pdf, professional_objective, profile_picture, salary_expectation, technical_skills, type_curse, user_id, work_preference, experience, education} = newProfile;

		const profile = await this.prismaUserRepository.UserViewProfile(user_id);

		if(profile) throw new Error("Esse usuário já tem um perfil cadastrado!");

		const createdProfile = await this.prismaUserRepository.UserCreateProfile({
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