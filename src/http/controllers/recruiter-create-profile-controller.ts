import { Request, Response } from "express";
import { PrismaProfilesRepository } from "../repositories/prisma/prisma-profile-repository";
import { RecruiterCreateProfileService } from "../services/recruiter-create-profile-service";


export async function RecruiterCreateProfileController(req: Request, res: Response){
	try {
	
		
		const {id} =  req.params;
	
		const { company_recruiter, role_recruiter, description_recruiter }  =  req.body;

	

		const prismaProfileRepository = new PrismaProfilesRepository();
		const recruiterCreateProfileService = new RecruiterCreateProfileService(prismaProfileRepository);

		await recruiterCreateProfileService.execute({company_recruiter, role_recruiter, description_recruiter, user_id: id});


		return res.json("Perfil do recrutador criado com sucesso!").status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}