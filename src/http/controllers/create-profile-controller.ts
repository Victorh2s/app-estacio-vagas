import {v2 as cloudinary} from "cloudinary";
import { Request, Response } from "express";
import { PrismaProfileRepository } from "../repositories/prisma/prisma-profile-repository";
import { PrismaExperienceRepository } from "../repositories/prisma/prisma-exoerience-repository";
import { PrismaEducationRepository } from "../repositories/prisma/prisma-education-repository";
import { CreateProfileService, IntCreateProfileService } from "../services/create-profile-service";

cloudinary.config({ 
	cloud_name: process.env.CLOUD_NAME, 
	api_key: process.env.API_KEY, 
	api_secret: process.env.API_SECRET 
});

export async function CreateProfileController(req: Request, res: Response){
	try {
	

		// model Profile {
		// 	id                    String     @id @default(auto()) @map("_id") @db.ObjectId
		// 	profile_picture       String?
		// 	curse                 String
		// 	type_curse            String
		// 	career_opportunity    String
		// 	experience            Experience[]
		// 	technical_skills      String[]
		// 	education             Education[]
		// 	professional_objective String?
		// 	salary_expectation    Int
		// 	work_preference       Location[] @default([])
		// 	cv_pdf                String?
		// 	user      User  @relation(fields: [user_id], references: [id])
		// 	user_id   String @unique @db.ObjectId
		//   }

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
	
		const {curse, type_curse, career_opportunity, experience, technical_skills, education, professional_objective, salary_expectation : salary, work_preference,} : IntCreateProfileService=  req.body;

	

		const newProfile = {
			curse, 
			type_curse, 
			career_opportunity, 
			experience, 
			technical_skills, 
			education, 
			professional_objective, 
			salary_expectation: Number(salary), 
			work_preference,
			profile_picture: profilePictureCloudinary ? profilePictureCloudinary.url : "",
			cv_pdf: cvPdfCloudinary ? cvPdfCloudinary.url : "",
			user_id:id
		};

		const prismaProfileRepository = new PrismaProfileRepository();
		const prismaExperienceRepository = new PrismaExperienceRepository();
		const prismaEducationRepository = new PrismaEducationRepository();
		const createProfileService = new CreateProfileService(prismaProfileRepository, prismaExperienceRepository, prismaEducationRepository);

		const profile = await createProfileService.execute(newProfile);


		return res.json(profile).status(200);

	} catch (error:any) {
		return res.status(500).json({ message: error.message });
	}
}