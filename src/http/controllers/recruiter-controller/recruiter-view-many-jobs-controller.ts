import { Request, Response } from "express";
import { RecruiterViewManyJobService } from "../../services/recruiter-service/recruiter-view-many-jobs-service";
import { PrismaRecruiterRepository } from "@/http/repositories/prisma/prisma-recruiter-repository";


export async function RecruiterViewManyJobsController(req: Request, res: Response){
	try {
		
		const { user_id } = req.params;

		const prismaRecruiterRepository = new PrismaRecruiterRepository();
		const recruiterViewManyJobService = new RecruiterViewManyJobService(prismaRecruiterRepository);

		const jobs = await recruiterViewManyJobService.execute(user_id);

		return res.json(jobs).status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}