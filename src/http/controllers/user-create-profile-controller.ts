import { Request, Response } from "express";
import { PrismaProfilesRepository } from "../repositories/prisma/prisma-profile-repository";
import { PrismaExperienceRepository } from "../repositories/prisma/prisma-experience-repository";
import { PrismaEducationRepository } from "../repositories/prisma/prisma-education-repository";
import { UserCreateProfileService } from "../services/user-create-profile-service";
import cloudinary from "@/utils/cloudinary";
import { IntUserCreateProfileService } from "../services/interfaces-service";


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

		
		const {id} =  req.params;
	
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
			user_id:id
		};

		const prismaProfileRepository = new PrismaProfilesRepository();
		const prismaExperienceRepository = new PrismaExperienceRepository();
		const prismaEducationRepository = new PrismaEducationRepository();
		const usercreateProfileService = new UserCreateProfileService(prismaProfileRepository, prismaExperienceRepository, prismaEducationRepository);

		await usercreateProfileService.execute(newProfile);


		return res.json("Perfil do usuário criado com sucesso!").status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}