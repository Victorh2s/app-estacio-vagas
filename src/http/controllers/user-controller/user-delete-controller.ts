import { Request, Response } from "express";
import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { UserDeleteService } from "../../services/user-service/user-delete-service";



export async function UserDeleteController(req: Request, res: Response){
	try {

		const { userId } = req.auth_routes;

		const prismaUserRepository = new PrismaUserRepository();
		const userDeleteService = new UserDeleteService(prismaUserRepository);

		await userDeleteService.execute(userId);


		return res.json("Usuário deletado com sucesso!").status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}