import { Request, Response } from "express";
import { PrismaJobRepository } from "../../repositories/prisma/prisma-job-repository";
import { ViewJobsService } from "@/http/services/jobs-service/view-jobs-service";

export async function ViewJobsController(req: Request, res: Response){
	try {
		const prismaJobRepository = new PrismaJobRepository();

		const viewJobsService = new ViewJobsService(prismaJobRepository);

		const jobs = await viewJobsService.execute();
		
		return res.json(jobs).status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}