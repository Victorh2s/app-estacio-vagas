import { Role } from "@prisma/client";
import { Request, Response, NextFunction } from "express";



export  function VerifyRokeMiddleware(
	roleToVerify: Role,
	
) {
	return async(request: Request, response: Response, next: NextFunction) => {

		const { role } = request.auth_routes;
        
		try {
            
			if (role !== "ADMIN" && role !== roleToVerify) {
				throw new Error("Unauthorized!");
			}
            
			return next();
		} catch (error) {
			return response.status(401).json("Not authorization");
		}
	};
}