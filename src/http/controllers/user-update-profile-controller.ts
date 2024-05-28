import { Request, Response } from "express";
import { PrismaProfilesRepository } from "../repositories/prisma/prisma-profile-repository";
import { UserUpdateProfileService } from "../services/user-update-profile-service";
import { IntUpdateProfileService } from "../services/interfaces-service";
import cloudinary from "@/utils/cloudinary";



export async function UserUpdateProfileController(req: Request, res: Response){
	try {

		let profilePictureCloudinary;
		let cvPdfCloudinary;

		if(req.files && req.files["profilePicture"] ){
			const profilePicture = req.files["profilePicture"][0];
	
			
			profilePictureCloudinary = await  cloudinary.uploader.upload(profilePicture.path,
				{ public_id: `${profilePicture.filename + Date.now()}`, folder:"profile_pictures" }, 
				function(error, result) {return result; });

		
		}

		if(req.files && req.files["cvPdf"]) {
			const cvPdf = req.files["cvPdf"][0];

			cvPdfCloudinary = await  cloudinary.uploader.upload(cvPdf.path,
				{ public_id: `${cvPdf.filename + Date.now()}`, folder:"cvs" }, 
				function(error, result) {return result; });
		}

		
		const {id} =  req.params;
	
		const {curse, type_curse, career_opportunity, experience, technical_skills, education, professional_objective, salary_expectation : salary, work_preference,} : IntUpdateProfileService =  req.body;
		const workPreferenceArray = work_preference
			? Array.isArray(work_preference)
				? work_preference
				: JSON.parse(work_preference.trim())
			: [];

		const experienceArray = experience
			? Array.isArray(experience)
				? experience
				: JSON.parse(experience.trim())
			: [];

		const educationArray = education
			? Array.isArray(education)
				? education
				: JSON.parse(education.trim())
			: [];



		const updateProfile = {
			curse, 
			type_curse, 
			career_opportunity, 
			experience: experienceArray.length > 0 ? experienceArray : undefined, 
			technical_skills, 
			education: educationArray.length > 0 ? educationArray : undefined,
			professional_objective, 
			salary_expectation: Number(salary), 
			work_preference: workPreferenceArray,
			profile_picture: profilePictureCloudinary ? profilePictureCloudinary.url : "",
			cv_pdf: cvPdfCloudinary ? cvPdfCloudinary.url : "",
			profileId:id
		};



		const prismaProfileRepository = new PrismaProfilesRepository();
		const userupdateProfileService = new UserUpdateProfileService(prismaProfileRepository);

		await userupdateProfileService.execute(updateProfile);


		return res.json("Perfil do usuário atualizado com sucesso!").status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}