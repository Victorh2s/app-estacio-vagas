import { PrismaProfilesRepository } from "../repositories/prisma/prisma-profile-repository";
import { IntRecruiterUpdateProfile } from "../repositories/interfaces/int-profile-repository";
import { RecruiterProfile } from "@prisma/client";

export interface IntRecruiterUpdateProfileService extends IntRecruiterUpdateProfile{}

function getUpdatedFields(oldData: RecruiterProfile, newData: Partial<RecruiterProfile>): Partial<RecruiterProfile> {
	const updatedFields: Partial<RecruiterProfile> = {};
	const keys = Object.keys(newData) as (keyof RecruiterProfile)[];

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

export class RecruiterUpdateProfileService {
	constructor(
		private prismaProfilesRepository: PrismaProfilesRepository,
	) {}

  
	async execute(updateRecruiterProfile: IntRecruiterUpdateProfile) {

		const { profileId, company_recruiter, description_recruiter, role_recruiter } = updateRecruiterProfile;

		await this.prismaProfilesRepository.RecruiterVerifyProfileExistById(profileId);

		const oldRecruiterProfile = await this.prismaProfilesRepository.RecruiterViewProfile(profileId);

		const updatedFields = getUpdatedFields(oldRecruiterProfile, {
			company_recruiter, 
			description_recruiter, 
			role_recruiter
		});

		const data = {
			profileId,
			...updatedFields
		};

		console.log(updatedFields);
		const createdProfile = await this.prismaProfilesRepository.RecruiterUpdateProfile(data);

		return createdProfile;
	}
}