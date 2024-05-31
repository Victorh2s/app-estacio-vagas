import { Request, Response } from "express";
import { PrismaApplicationRepository } from "../../repositories/prisma/prisma-application-repository";
import { UserApplicationJobService } from "../../services/user-service/user-aplication-job-service";



export async function UserApplicationJobController(req: Request, res: Response){
	try {
		const { userId } = req.auth_routes;
		const { job_offer_id } = req.params;

		const prismaApplicationRepository = new PrismaApplicationRepository();
		const userApplicationJobService = new UserApplicationJobService(prismaApplicationRepository);

		await userApplicationJobService.execute({ job_offer_id, user_id: userId });


		return res.json("Usuário se candidatou a vaga com sucesso!").status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}