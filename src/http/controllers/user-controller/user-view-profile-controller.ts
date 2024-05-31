import { Request, Response } from "express";
import { UserViewProfileService } from "../../services/user-service/user-view-profile-service";
import { PrismaUserRepository } from "@/http/repositories/prisma/prisma-user-repository";


export async function UserViewProfileController(req: Request, res: Response){
	try {
		
		const { userId } = req.auth_routes;
	
		const prismaUserRepository = new PrismaUserRepository();
		const userViewProfileService = new UserViewProfileService(prismaUserRepository);

		const userProfile = await userViewProfileService.execute(userId);


		return res.json(userProfile).status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}