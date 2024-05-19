import jwt from "jsonwebtoken";

export class GenerateTokensService {
	execute(userId: string) {

		const accessToken = jwt.sign({ id: userId }, process.env.TOKEN_SECRET as string, {
			subject: userId,
			expiresIn: process.env.TOKEN_EXPIRATION,
		});

		return accessToken;
		
	}
}
