import { PrismaRecruiterRepository } from "@/http/repositories/prisma/prisma-recruiter-repository";
import { IntRecruiterUpdateProfile } from "../../repositories/interfaces/int-recruiter-repository";
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
		private prismaRecruiterRepository: PrismaRecruiterRepository,
	) {}

  
	async execute(updateRecruiterProfile: IntRecruiterUpdateProfile, userId: string) {

		const { profileId, company_recruiter, description_recruiter, role_recruiter } = updateRecruiterProfile;

		await this.prismaRecruiterRepository.RecruiterVerifyProfileExistById(profileId);

		const oldRecruiterProfile = await this.prismaRecruiterRepository.RecruiterViewProfile(userId);

		if(oldRecruiterProfile.id !== profileId) throw new Error("Permissão negada: Esse perfil não corresponde ao recrutador logado!");
		
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
		const createdProfile = await this.prismaRecruiterRepository.RecruiterUpdateProfile(data);

		return createdProfile;
	}
}