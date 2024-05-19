import express from "express";
import cors from "cors";
import "dotenv/config";
import { userRoute } from "./http/routes/user-route";

export const app = express();


app.use(cors());
app.use(express.json());

app.use("/user", userRoute);
app.get("/", async (req, res) => {
	try {
	
		return res.json("Rota GET funcionando!!").status(200);
	} catch (error) {
		return res.json(error);
	}
});



