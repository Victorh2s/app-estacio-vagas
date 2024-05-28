import { Request, Response } from "express";
import { PrismaProfilesRepository } from "../repositories/prisma/prisma-profile-repository";
import { RecruiterUpdateProfileService } from "../services/recruiter-update-profile-service";


export async function RecruiterUpdateProfileController(req: Request, res: Response){
	try {
	
		
		const {id} =  req.params;
	
		const { company_recruiter, role_recruiter, description_recruiter }  =  req.body;

	

		const prismaProfileRepository = new PrismaProfilesRepository();
		const recruiterUpdateProfileService = new RecruiterUpdateProfileService(prismaProfileRepository);

		await recruiterUpdateProfileService.execute({company_recruiter, role_recruiter, description_recruiter, profileId: id});


		return res.json("Perfil do recrutador criado com sucesso!").status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}