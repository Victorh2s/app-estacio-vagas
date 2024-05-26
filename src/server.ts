import { PrismaClient } from "@prisma/client";
import { app } from "./app";
import "dotenv/config";
const prisma = new PrismaClient();



app.listen(process.env.PORT, async() => {
	console.log(`Servidor rodando em http://localhost:${process.env.PORT} `);

	// await prisma.profile.delete({
	// 	where:{
	// 		id: "665284c36af3ae93f62ef376"
	// 	}
	// });
});