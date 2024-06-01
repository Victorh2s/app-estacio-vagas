import { PrismaUserRepository } from "@/http/repositories/prisma/prisma-user-repository";
import { Profile } from "@prisma/client";
import { IntUserUpdateProfile } from "@/http/repositories/interfaces/int-user-repository";
import { IntUpdateProfileService } from "../interfaces-services";

function getUpdatedFields(oldData: Profile, newData: Partial<Profile>): Partial<Profile> {
	const updatedFields: Partial<Profile> = {};
	const keys = Object.keys(newData) as (keyof Profile)[];

	for (const key of keys) {
		const newValue = newData[key];
		const oldValue = oldData[key];

		const isValueNaN = (val: any) => typeof val === "number" && Number.isNaN(val);

		if (newValue !== undefined && newValue !== null && newValue !== oldValue && !isValueNaN(newValue)) {
			updatedFields[key] = newValue;
		}
	}
	return updatedFields;
}

export class UserUpdateProfileService {
	constructor(
		private prismaUserRepository: PrismaUserRepository,
	) {}

	async execute(updateProfile: IntUpdateProfileService ) {
		const { career_opportunity, curse, cv_pdf, professional_objective, profile_picture, salary_expectation, technical_skills, type_curse, user_id, work_preference, experience, education } = updateProfile;
        
		const oldProfile = await this.prismaUserRepository.UserViewProfile(user_id);

		const updatedFields = getUpdatedFields(oldProfile, {
			career_opportunity,
			curse,
			professional_objective,
			salary_expectation,
			technical_skills,
			type_curse,
			work_preference,
		});

		if (typeof profile_picture === "string" && profile_picture.trim() !== "") {
			updatedFields.profile_picture = profile_picture;
		}

		if (typeof cv_pdf === "string" && cv_pdf.trim() !== "") {
			updatedFields.cv_pdf = cv_pdf;
		}

		const data: IntUserUpdateProfile = {
			...updatedFields
		};

		if (Array.isArray(education) && education.length > 0 && typeof education !=="undefined") {
			data.education = education;
		}

		if (Array.isArray(experience) && experience.length > 0 && typeof experience !=="undefined") {
			data.experience = experience;
		}


		await this.prismaUserRepository.UserUpdateProfile(data, user_id);

		return;
	}
}
