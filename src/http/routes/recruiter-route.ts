import { Router } from "express";
import { RecruiterCreateProfileController } from "../controllers/recruiter-controller/recruiter-create-profile-controller";
import { RecruiterUpdateProfileController } from "../controllers/recruiter-controller/recruiter-update-profile-controller";
import { RecruiterViewProfileController } from "../controllers/recruiter-controller/recruiter-view-profile-controller";
import { RecruiterCreateJobController } from "../controllers/recruiter-controller/recruiter-create-job-controller";
import { RecruiterUpdateJobController } from "../controllers/recruiter-controller/recruiter-update-job-controller";
import { RecruiterViewManyJobsController } from "../controllers/recruiter-controller/recruiter-view-many-jobs-controller";
import { RecruiterViewUniqueJobController } from "../controllers/recruiter-controller/recruiter-view-unique-job-controller";
import { RecruiterDeleteJobController } from "../controllers/recruiter-controller/recruiter-delete-job-controller";
import { RecruiterUpdateApplicationOfUserController } from "../controllers/recruiter-controller/recruiter-update-application-of-user-controller";
import { VerifyTokenMiddleware } from "../middlewares/verify-token";
import { VerifyRoleMiddleware } from "../middlewares/verify-role";


export const recruiterRoute = Router();

recruiterRoute.get("/view-profile/:id", RecruiterViewProfileController);
recruiterRoute.get("/view-jobs/:id", RecruiterViewManyJobsController);
recruiterRoute.get("/view-job/:id", RecruiterViewUniqueJobController);
recruiterRoute.post("/create-profile/:id", VerifyTokenMiddleware, VerifyRoleMiddleware("RECRUITER"), RecruiterCreateProfileController);
recruiterRoute.post("/create-job/:id", VerifyTokenMiddleware, VerifyRoleMiddleware("RECRUITER"), RecruiterCreateJobController);
recruiterRoute.put("/update-profile/:id", VerifyTokenMiddleware, VerifyRoleMiddleware("RECRUITER"),  RecruiterUpdateProfileController);
recruiterRoute.put("/update-job/:id", VerifyTokenMiddleware, VerifyRoleMiddleware("RECRUITER"), RecruiterUpdateJobController);
recruiterRoute.put("/update-application/:application_id",VerifyTokenMiddleware, VerifyRoleMiddleware("RECRUITER"),  RecruiterUpdateApplicationOfUserController);
recruiterRoute.delete("/delete-job/:id",VerifyTokenMiddleware, VerifyRoleMiddleware("RECRUITER"),  RecruiterDeleteJobController);





