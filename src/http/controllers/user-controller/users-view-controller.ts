import { Request, Response } from "express";
import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { UsersViewService } from "../../services/user-service/user-view-service";

export async function UsersViewController(req: Request, res: Response){
	try {
		
		const prismaUserRepository = new PrismaUserRepository();
		const usersViewService = new UsersViewService(prismaUserRepository);

		const users = await usersViewService.execute();


		return res.json(users).status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}