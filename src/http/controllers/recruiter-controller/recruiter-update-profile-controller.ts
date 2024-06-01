import { Request, Response } from "express";
import { RecruiterUpdateProfileService } from "../../services/recruiter-service/recruiter-update-profile-service";
import { PrismaRecruiterRepository } from "@/http/repositories/prisma/prisma-recruiter-repository";


export async function RecruiterUpdateProfileController(req: Request, res: Response){
	try {
	
		const { userId } = req.auth_routes;
		const { company_recruiter, role_recruiter, description_recruiter } = req.body;

		const prismaRecruiterRepository = new PrismaRecruiterRepository();
		const recruiterUpdateProfileService = new RecruiterUpdateProfileService(prismaRecruiterRepository);

		await recruiterUpdateProfileService.execute({company_recruiter, role_recruiter, description_recruiter}, userId);


		return res.json("Perfil do recrutador atualizado com sucesso!").status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}