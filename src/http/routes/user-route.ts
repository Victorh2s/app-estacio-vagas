import { Router } from "express";
import multer from "multer";
import { UsersViewController } from "../controllers/user-controller/users-view-controller";
import { UserViewController } from "../controllers/user-controller/user-view-controller copy";
import { UserDeleteController } from "../controllers/user-controller/user-delete-controller";
import { UserApplicationJobController } from "../controllers/user-controller/user-application-job-controller";
import { UserCreateProfileController } from "../controllers/user-controller/user-create-profile-controller";
import { UserUpdateProfileController } from "../controllers/user-controller/user-update-profile-controller";
import { UserViewProfileController } from "../controllers/user-controller/user-view-profile-controller";
import { UserRemoveApplicationJobController } from "../controllers/user-controller/user-remove-application-job-controller";
import { VerifyTokenMiddleware } from "../middlewares/verify-token";
import { VerifyRoleMiddleware } from "../middlewares/verify-role";

export const userRoute = Router();

const storage = multer.diskStorage({
	destination: "uploads",
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
		cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.originalname.split(".").pop());
	},
});
  
const upload = multer({ storage,
	fileFilter(req, file, callback) {
		const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
		if (allowedMimeTypes.indexOf(file.mimetype) === -1) {
			callback(new multer.MulterError("LIMIT_FIELD_VALUE"));
		} else {
			callback(null, true);
		}
	},
}); 
  
const uploads = upload.fields([{name: "profilePicture", maxCount:1},{name:"cvPdf", maxCount:1}]);



userRoute.get("/view/:user_id", UserViewController);
userRoute.get("/view-many",VerifyTokenMiddleware, VerifyRoleMiddleware("ADMIN"), UsersViewController);
userRoute.get("/view-profile/:user_id", UserViewProfileController);
userRoute.delete("/delete/:id", VerifyTokenMiddleware, UserDeleteController);
userRoute.post("/create-profile/:id", uploads, VerifyTokenMiddleware, VerifyRoleMiddleware("USER"), UserCreateProfileController);
userRoute.put("/update-profile", uploads, VerifyTokenMiddleware, VerifyRoleMiddleware("USER"), UserUpdateProfileController);
userRoute.post("/application-job/:job_offer_id", VerifyTokenMiddleware, VerifyRoleMiddleware("USER"), UserApplicationJobController);
userRoute.delete("/remove-application-job/:application_id", VerifyTokenMiddleware, VerifyRoleMiddleware("USER"), UserRemoveApplicationJobController);