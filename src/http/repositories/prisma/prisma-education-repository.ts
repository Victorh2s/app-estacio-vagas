import { PrismaClient } from "@prisma/client";
import { IntCreateAndUpdateEducation, IntPrismaEducationRepository } from "../interfaces/int-education-repository";

const prisma = new PrismaClient();




export class PrismaEducationRepository implements IntPrismaEducationRepository{

	async ViewUniqueEducationInProfile(educationId: string){
		return await prisma.education.findUnique({
			where:{
				id: educationId
			}
		});
	}

	async ViewEducationInProfile(profileId: string){
		return await prisma.education.findMany({
			where:{
				profile_id: profileId
			}
		});
	}

	async CreateEducationInProfile(data: IntCreateAndUpdateEducation) {
		return await prisma.education.create({
			data
		});
	}

	async UpdateEducationInProfile(data: IntCreateAndUpdateEducation, educationId: string){
		return await prisma.education.update({
			where:{
				id: educationId
			},
			data
		});
	}

	async DeleteEducationInProfile(educationId: string) {
		return await prisma.education.delete({
			where:{
				id: educationId
			}
		});
	}

	async DeleteManyEducationInProfile(profileId: string) {
		return await prisma.education.deleteMany({
			where:{
				profile_id: profileId
			}
		});
	}

	async VerifyEducationById(educationId: string) {
		const education = await prisma.education.findUnique({
			where:{
				id: educationId
			}
		});

		if(!education) throw new Error("Formação acadêmica do usuário não encontrada!");
        
		return;
	}
}