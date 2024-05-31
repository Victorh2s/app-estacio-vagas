import express from "express";
import cors from "cors";
import "dotenv/config";
import { userRoute } from "./http/routes/user-route";
import { VerifyTokenMiddleware } from "./http/middlewares/verify-token";
import { VerifyRoleMiddleware } from "./http/middlewares/verify-role";
import { authRoute } from "./http/routes/auth-route";
import { jobRoute } from "./http/routes/job-route";
import { recruiterRoute } from "./http/routes/recruiter-route";

export const app = express();


app.use(cors());
app.use(express.json());

app.use("/user", userRoute);
app.use("/recruiter", recruiterRoute);
app.use("/job", jobRoute);
app.use("/auth", authRoute);

app.get("/",VerifyTokenMiddleware,VerifyRoleMiddleware("USER"), async (req, res) => {
	try {
	
		return res.json("Rota GET funcionando!!").status(200);
	} catch (error) {
		return res.json(error);
	}
});
