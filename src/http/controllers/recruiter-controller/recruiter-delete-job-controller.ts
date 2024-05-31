import { Request, Response } from "express";
import { PrismaJobRepository } from "../../repositories/prisma/prisma-job-repository";
import { RecruiterDeleteJobService } from "@/http/services/recruiter-service/recruiter-delete-job-service";
import { PrismaRecruiterRepository } from "@/http/repositories/prisma/prisma-recruiter-repository";


export async function RecruiterDeleteJobController(req: Request, res: Response){
	try {
		const { userId } = req.auth_routes;
		const { job_id } =  req.params;
	
		const prismaJobRepository = new PrismaJobRepository();
		const prismaRecruiterRepository = new PrismaRecruiterRepository();
		const recruiterDeleteJobService = new RecruiterDeleteJobService(prismaJobRepository, prismaRecruiterRepository);

		await recruiterDeleteJobService.execute(job_id, userId);


		return res.json("Vaga deletada com sucesso!").status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}