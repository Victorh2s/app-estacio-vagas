import { Router } from "express";
import { ViewJobsController } from "../controllers/jobs-controller/view-jobs-controller";
import { ViewJobController } from "../controllers/jobs-controller/view-job-controller";

export const jobRoute = Router();

jobRoute.get("/view-many", ViewJobsController);
jobRoute.get("/view/:job_id", ViewJobController);





