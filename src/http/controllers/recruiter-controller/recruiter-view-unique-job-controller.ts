import { Request, Response } from "express";
import { RecruiterViewUniqueJobService } from "../../services/recruiter-service/recruiter-view-unique-jobs-service";
import { PrismaRecruiterRepository } from "@/http/repositories/prisma/prisma-recruiter-repository";


export async function RecruiterViewUniqueJobController(req: Request, res: Response){
	try {
		const { job_id } =  req.params;
	
		const prismaRecruiterRepository = new PrismaRecruiterRepository();
		const recruiterViewUniqueJobService = new RecruiterViewUniqueJobService(prismaRecruiterRepository);

		const job = await recruiterViewUniqueJobService.execute(job_id);


		return res.json(job).status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}