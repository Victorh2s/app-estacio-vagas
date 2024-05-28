import { IntUserUpdateProfile } from "../repositories/interfaces/int-profile-repository";
import { PrismaProfilesRepository } from "../repositories/prisma/prisma-profile-repository";
import { IntUpdateProfileService } from "./interfaces-service";
import { Profile } from "@prisma/client";

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
		private prismaProfilesRepository: PrismaProfilesRepository,
	) {}

	async execute(updateProfile: IntUpdateProfileService) {
		const { career_opportunity, curse, cv_pdf, professional_objective, profile_picture, salary_expectation, technical_skills, type_curse, profileId, work_preference, experience, education } = updateProfile;
        
		await this.prismaProfilesRepository.UserVerifyProfileExistById(profileId);

		const oldProfile = await this.prismaProfilesRepository.UserViewProfile(profileId);

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


		await this.prismaProfilesRepository.UserUpdateProfile(data, profileId);

		return;
	}
}
