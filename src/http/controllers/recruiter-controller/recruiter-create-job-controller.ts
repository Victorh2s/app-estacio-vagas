import { Request, Response } from "express";
import { RecruiterCreateJobService } from "../../services/recruiter-service/recruiter-create-job-service";
import { PrismaJobRepository } from "../../repositories/prisma/prisma-job-repository";
import { PrismaRecruiterRepository } from "@/http/repositories/prisma/prisma-recruiter-repository";


export async function RecruiterCreateJobController(req: Request, res: Response){
	try {
		const { userId } = req.auth_routes;
		const { recruiter_profile_id } =  req.params;
	
		const { role_job, company_job, salary, office_location, description, requirements, status_job }  =  req.body;

		const prismaRecruiterRepository = new PrismaRecruiterRepository();
		const prismaJobRepository = new PrismaJobRepository();
		const recruiterCreateJobService = new RecruiterCreateJobService(prismaJobRepository, prismaRecruiterRepository);

		await recruiterCreateJobService.execute({role_job, company_job, salary, office_location, description, requirements, status_job, recruiter_profile_id}, userId);


		return res.json("Vaga criada com sucesso!").status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}