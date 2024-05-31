import { Request, Response } from "express";
import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { UserViewService } from "../../services/user-service/user-view-service copy";

export async function UserViewController(req: Request, res: Response){
	try {
		
		const { userId } = req.auth_routes;
	
		const prismaUserRepository = new PrismaUserRepository();
		const userViewService = new UserViewService(prismaUserRepository);

		const user = await userViewService.execute(userId);


		return res.json(user).status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}