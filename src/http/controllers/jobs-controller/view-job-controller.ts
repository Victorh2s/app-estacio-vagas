import { Request, Response } from "express";
import { PrismaJobRepository } from "../../repositories/prisma/prisma-job-repository";
import { ViewJobService } from "@/http/services/jobs-service/view-job-service";

export async function ViewJobController(req: Request, res: Response){
	try {

		const { job_id } = req.params;
		const prismaJobRepository = new PrismaJobRepository();

		const viewJobService = new ViewJobService(prismaJobRepository);

		const job = await viewJobService.execute(job_id);
		
		return res.json(job).status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}