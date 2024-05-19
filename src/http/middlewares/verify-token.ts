import { Request, Response, NextFunction } from "express";
import { PrismaUserRepository } from "../repositories/prisma/prisma-user-repository";
import jwt from "jsonwebtoken";

interface TokenPayLoad {
    token: string;
    id: string;
    iat: number;
    exp: number;
  }


export async function VerifyTokenMiddleware(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const { authorization } = request.headers;

	if (!authorization) {
		return response.status(401).json("Not authorization");
	}

	const token = authorization.replace("Bearer", "").trim();

	try {
		
		const prismaUserRepository = new PrismaUserRepository();

		const data = jwt.verify(token, process.env.TOKEN_SECRET as string);

		const { id } = data as TokenPayLoad;

		const user = await prismaUserRepository.GetUser(id);

		if (!user) {
			throw new Error("Not Authorization");
		}

      
		

		request.auth_routes = {
			userId: user.id,
			token: token,
			role: user.role
		};


		return next();
	} catch (error) {
		return response.status(401).json("Not authorization");
	}
}