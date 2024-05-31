import { PrismaClient } from "@prisma/client";
import { IntPrismaRecruiterRepository, IntRecruiterCreateProfile, IntRecruiterUpdateProfile } from "../interfaces/int-recruiter-repository";

const prisma = new PrismaClient();

export class PrismaRecruiterRepository implements IntPrismaRecruiterRepository{

	async RecruiterViewProfile(userId: string) {
		const profile = await prisma.recruiterProfile.findUnique({
			where:{
				user_id: userId
			},
			include:{
				jobOffers: {
					include: {
						applications: true
					}
				}
			}
		});

		if(!profile) throw new Error("Este usuário não contém perfil de recrutador!");

		return profile;
	}
	
	async RecruiterCreateProfile(data:IntRecruiterCreateProfile){
		const recruiterProfile = await prisma.recruiterProfile.create({
			data:data
		});

		return recruiterProfile;
	}
	
	async RecruiterUpdateProfile(data: Partial<IntRecruiterUpdateProfile>) {

		const { profileId, ...rest } = data;

		const profile = await prisma.recruiterProfile.update({
			where: {
				id: profileId
			},
			data: {
				...rest,
			}
		});   

		return profile;

	}

	async RecruiterVerifyProfileExistById(recruiterProfileId: string) {
		const recruiterProfile = await prisma.recruiterProfile.findUnique({
			where: {
				id: recruiterProfileId
			}
		});

		if(!recruiterProfile) throw new Error("Perfil de recrutador não encontrado!");

		return;
	}

}