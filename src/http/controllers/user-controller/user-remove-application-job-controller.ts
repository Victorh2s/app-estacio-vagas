import { Request, Response } from "express";
import { PrismaApplicationRepository } from "@/http/repositories/prisma/prisma-application-repository";
import { UserRemoveApplicationJobService } from "@/http/services/user-service/user-remove-application-job-service";



export async function UserRemoveApplicationJobController(req: Request, res: Response){
	try {

		const { userId } = req.auth_routes;
		const { application_id } =  req.params;
        
		const prismaApplicationRepository = new PrismaApplicationRepository();
		const userRemoveApplicationJobService = new UserRemoveApplicationJobService(prismaApplicationRepository);

		await userRemoveApplicationJobService.execute({applicationId: application_id, userId});


		return res.json("Usuário deletado com sucesso!").status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}