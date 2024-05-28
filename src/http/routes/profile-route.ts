import multer from "multer";
import { Router } from "express";
import { UserCreateProfileController } from "../controllers/user-create-profile-controller";
import { UserUpdateProfileController } from "../controllers/user-update-profile-controller";
import { RecruiterCreateProfileController } from "../controllers/recruiter-create-profile-controller";
import { RecruiterUpdateProfileController } from "../controllers/recruiter-update-profile-controller";



export const profileRoute = Router();

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
  

profileRoute.post("/create/user/:id", uploads, UserCreateProfileController);
profileRoute.put("/update/user/:id", uploads, UserUpdateProfileController);
profileRoute.post("/create/recruiter/:id", RecruiterCreateProfileController);
profileRoute.put("/update/recruiter/:id",  RecruiterUpdateProfileController);


