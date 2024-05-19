import express from "express";
import cors from "cors";
import "dotenv/config";
import { userRoute } from "./http/routes/user-route";
import { VerifyTokenMiddleware } from "./http/middlewares/verify-token";
import { VerifyRokeMiddleware } from "./http/middlewares/verify-role";

export const app = express();


app.use(cors());
app.use(express.json());

app.use("/user", userRoute);
app.get("/",VerifyTokenMiddleware,VerifyRokeMiddleware("USER"), async (req, res) => {
	try {
	
		return res.json("Rota GET funcionando!!").status(200);
	} catch (error) {
		return res.json(error);
	}
});



