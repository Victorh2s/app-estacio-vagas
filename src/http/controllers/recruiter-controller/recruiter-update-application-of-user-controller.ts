import { Request, Response } from "express";
import { PrismaApplicationRepository } from "@/http/repositories/prisma/prisma-application-repository";
import { PrismaRecruiterRepository } from "@/http/repositories/prisma/prisma-recruiter-repository";
import { RecruiterUpdateApplicationOfUserService } from "@/http/services/recruiter-service/recruiter-update-application-of-user-service";
import { z } from "zod";



const recruiterUpdateApplicationBodySchema = z.object({
	status: z.enum(["PENDENTE", "APROVADA", "REJEITADA"],{message:"O campo 'status' deve ser 'PENDENTE', 'APROVADA' ou 'REJEITADA'."})
});   

export async function RecruiterUpdateApplicationOfUserController(req: Request, res: Response){
	try {

		const { userId } = req.auth_routes;

		const { status } = recruiterUpdateApplicationBodySchema.parse(req.body);

		const { application_id } =  req.params;

		const prismaApplicationRepository = new PrismaApplicationRepository();
		const prismaRecruiterRepository = new PrismaRecruiterRepository();
		const recruiterUpdateApplicationOfUserService = new RecruiterUpdateApplicationOfUserService(prismaApplicationRepository, prismaRecruiterRepository);

		await recruiterUpdateApplicationOfUserService.execute({applicationId: application_id, status, userId });


		return res.json("Candidatura do usuário atualizada com sucesso!").status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}