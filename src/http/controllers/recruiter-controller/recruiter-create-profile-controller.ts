import { Request, Response } from "express";
import { RecruiterCreateProfileService } from "../../services/recruiter-service/recruiter-create-profile-service";
import { PrismaRecruiterRepository } from "@/http/repositories/prisma/prisma-recruiter-repository";


export async function RecruiterCreateProfileController(req: Request, res: Response){
	try {
	
		const { userId } = req.auth_routes;
		
		const { company_recruiter, role_recruiter, description_recruiter }  =  req.body;

		const prismaRecruiterRepository = new PrismaRecruiterRepository();
		const recruiterCreateProfileService = new RecruiterCreateProfileService(prismaRecruiterRepository);

		await recruiterCreateProfileService.execute({company_recruiter, role_recruiter, description_recruiter, user_id: userId});


		return res.json("Perfil do recrutador criado com sucesso!").status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}