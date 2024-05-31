import { PrismaClient } from "@prisma/client";
import { IntCreateApplication, IntPrismaApplicationRepository, IntUpdateApplication } from "../interfaces/int-application-repository";

const prisma = new PrismaClient();




export class PrismaApplicationRepository implements IntPrismaApplicationRepository{

	async ViewApplication(applicationId: string){
		const application = await prisma.application.findUnique({
			where:{
				id: applicationId
			}
		});

		if(!application) throw new Error("Vaga não encontrada!");

		return application;
	}

	async ViewApplicationsByUser(userId: string){
		return await prisma.application.findMany({
			where:{
				user_id: userId
			}
		});
	}

	async ViewApplicationsByJob(jobId: string){
		return await prisma.application.findMany({
			where:{
				job_offer_id: jobId
			}
		});
	}

	async CreateApplication(data: IntCreateApplication) {
		return await prisma.application.create({
			data:{
				user_id: data.user_id,
				status: "PENDENTE",
				job_offer_id: data.job_offer_id
			}
		});
	}
    
	async UpdateApplication(data: IntUpdateApplication) {
		return await prisma.application.update({
			where:{
				id: data.application_id
			},
			data:{
				status: data.status
			}
		});
	}

	async RemoveApplication(applicationId: string) {
		return await prisma.application.delete({
			where:{
				id: applicationId
			}
		});
	}

}