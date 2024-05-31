import { Request, Response } from "express";
import { RecruiterViewProfileService } from "../../services/recruiter-service/recruiter-view-profile-service";
import { PrismaRecruiterRepository } from "@/http/repositories/prisma/prisma-recruiter-repository";


export async function RecruiterViewProfileController(req: Request, res: Response){
	try {
		
		const { userId } = req.auth_routes;
	
		const prismaRecruiterRepository = new PrismaRecruiterRepository();
		const recruiterViewProfileService = new RecruiterViewProfileService(prismaRecruiterRepository);

		const recruiterProfile = await recruiterViewProfileService.execute(userId);


		return res.json(recruiterProfile).status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}