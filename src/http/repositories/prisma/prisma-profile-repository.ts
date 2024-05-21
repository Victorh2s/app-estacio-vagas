import { PrismaClient } from "@prisma/client";
import { IntCreateAndUpdateProfile, IntPrismaProfileRepository } from "../interfaces/int-profile-repository";

const prisma = new PrismaClient();




export class PrismaProfileRepository implements IntPrismaProfileRepository{

 

	async CreateProfile(data:IntCreateAndUpdateProfile) {
		const profileId =  await prisma.profile.create({
			data
		});
		return profileId;
	}

	async UpdateProfile(data: IntCreateAndUpdateProfile, profileId: string) {
		const profile = await prisma.profile.update({
			where:{
				id: profileId
			},
			data
		});   

		return profile;
	}

	async VerifyProfileExistById(profileId: string) {
		const profile = await prisma.profile.findUnique({
			where: {
				id: profileId
			}
		});

		if(!profile) throw new Error("Perfil não encontrado!");

		return;
	}

}