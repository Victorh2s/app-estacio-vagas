import express from "express";
import cors from "cors";
import "dotenv/config";

export const app = express();


app.use(cors());
app.get("/", async (req, res) => {
	try {
	
		return res.json("Rota GET funcionando!!").status(200);
	} catch (error) {
		return res.json(error);
	}
});



