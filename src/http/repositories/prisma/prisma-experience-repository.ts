import { PrismaClient } from "@prisma/client";
import { IntCreateAndUpdateExperience, IntPrismaExperienceRepository } from "../interfaces/int-experiencia-repository";

const prisma = new PrismaClient();




export class PrismaExperienceRepository implements IntPrismaExperienceRepository{

	async ViewUniqueExperienceInProfile(experienceId: string){
		return await prisma.experience.findUnique({
			where:{
				id: experienceId
			}
		});
	}

	async ViewExperienceInProfile(profileId: string) {
		return await prisma.experience.findMany({
			where:{
				profile_id: profileId
			}
		});
	}


    
	async CreateExperienceInProfile(data:IntCreateAndUpdateExperience) {
		return await prisma.experience.create({
			data
		});
	}

	async UpdateExperienceInProfile(data: IntCreateAndUpdateExperience, experienceId: string) {
		return await prisma.experience.update({
			where:{
				id: experienceId
			},
			data
		});   

	}


	async DeleteExperienceInProfile(experienceId: string) {
		return await prisma.experience.delete({
			where:{id: experienceId}
		});
	}
    
	async DeleteManyExperienceInProfile(profileId: string) {
		return await prisma.experience.deleteMany({
			where:{
				profile_id: profileId
			}
		});
	}

	async VerifyExperienceExistById(experienceId: string) {
		const experience = await prisma.experience.findUnique({
			where: {
				id: experienceId
			}
		});

		if(!experience) throw new Error("Experiência do perfil do usuário não encontrada!");

		return;
	}

}