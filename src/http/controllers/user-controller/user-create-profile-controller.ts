import { Request, Response } from "express";
import { UserCreateProfileService } from "../../services/user-service/user-create-profile-service";
import cloudinary from "@/utils/cloudinary";
import { PrismaUserRepository } from "@/http/repositories/prisma/prisma-user-repository";
import { IntUserCreateProfileService } from "@/http/services/interfaces-services";


export async function UserCreateProfileController(req: Request, res: Response){
	try {
	
		let profilePictureCloudinary;
		let cvPdfCloudinary;

		if(req.files && req.files["profilePicture"] ){
			const profilePicture = req.files["profilePicture"][0];
	
			
			profilePictureCloudinary = await  cloudinary.uploader.upload(profilePicture.path,
				{ public_id: `${profilePicture.filename}`, folder:"profile_pictures" }, 
				function(error, result) {return result; });

		
		}

		if(req.files && req.files["cvPdf"]) {
			const cvPdf = req.files["cvPdf"][0];

			cvPdfCloudinary = await  cloudinary.uploader.upload(cvPdf.path,
				{ public_id: `${cvPdf.filename}`, folder:"cvs" }, 
				function(error, result) {return result; });
		}

		
		const { userId } = req.auth_routes;
		console.log(userId);
	
		const {curse, type_curse, career_opportunity, experience, technical_skills, education, professional_objective, salary_expectation : salary, work_preference,} : IntUserCreateProfileService =  req.body;
		const workPreferenceArray = Array.isArray(work_preference) ? work_preference : JSON.parse(work_preference.trim());
		const experienceArray = Array.isArray(experience) ? experience : JSON.parse(experience.trim());
		const educationArray = Array.isArray(education) ? education : JSON.parse(education.trim());



		const newProfile = {
			curse, 
			type_curse, 
			career_opportunity, 
			experience: experienceArray, 
			technical_skills, 
			education: educationArray, 
			professional_objective, 
			salary_expectation: Number(salary), 
			work_preference: workPreferenceArray,
			profile_picture: profilePictureCloudinary ? profilePictureCloudinary.url : "",
			cv_pdf: cvPdfCloudinary ? cvPdfCloudinary.url : "",
			user_id: userId
		};

		const prismaUserRepository = new PrismaUserRepository();
		const usercreateProfileService = new UserCreateProfileService(prismaUserRepository);

		await usercreateProfileService.execute(newProfile);


		return res.json("Perfil do usuário criado com sucesso!").status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}