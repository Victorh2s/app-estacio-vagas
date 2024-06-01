import { Request, Response } from "express";
import { UserViewProfileService } from "../../services/user-service/user-view-profile-service";
import { PrismaUserRepository } from "@/http/repositories/prisma/prisma-user-repository";


export async function UserViewProfileController(req: Request, res: Response){
	try {
		
		const { user_id } = req.params;
	
		const prismaUserRepository = new PrismaUserRepository();
		const userViewProfileService = new UserViewProfileService(prismaUserRepository);

		const userProfile = await userViewProfileService.execute(user_id);


		return res.json(userProfile).status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}