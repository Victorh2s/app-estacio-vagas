import { Request, Response } from "express";
import { RecruiterUpdateJobService } from "../../services/recruiter-service/recruiter-update-job-service";
import { PrismaJobRepository } from "../../repositories/prisma/prisma-job-repository";
import { PrismaRecruiterRepository } from "@/http/repositories/prisma/prisma-recruiter-repository";


export async function RecruiterUpdateJobController(req: Request, res: Response){
	try {
		const { userId } = req.auth_routes;
		const { job_id } =  req.params;
		const { role_job, company_job, salary, office_location, description, requirements, status_job }  =  req.body;

		const prismaRecruiterRepository = new PrismaRecruiterRepository();
		const prismaJobRepository = new PrismaJobRepository();
		const recruiterUpdateJobService = new RecruiterUpdateJobService(prismaJobRepository,prismaRecruiterRepository);

		const newJob = await recruiterUpdateJobService.execute({job_id, role_job, company_job, salary, office_location, description, requirements, status_job }, userId);


		return res.json(newJob).status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}