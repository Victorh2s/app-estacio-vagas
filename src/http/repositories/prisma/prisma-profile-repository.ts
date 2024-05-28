import { PrismaClient } from "@prisma/client";
import { IntUserCreateProfile, IntPrismaProfilesRepository, IntUserUpdateProfile, IntRecruiterCreateProfile, IntRecruiterUpdateProfile } from "../interfaces/int-profile-repository";

const prisma = new PrismaClient();




export class PrismaProfilesRepository implements IntPrismaProfilesRepository{

	async UserViewProfile(profileId: string) {
		const profile = await prisma.profile.findUnique({
			where:{
				id: profileId
			},
			include:{
				experience: true,
				education: true
			}
		});

		if(!profile) throw new Error("Esse perfil não existe");

		return profile;
	}

	async UserCreateProfile(data:IntUserCreateProfile) {
		const profile = await prisma.profile.create({
			data: {
				profile_picture: data.profile_picture ?? null,
				curse: data.curse,
				type_curse: data.type_curse,
				career_opportunity: data.career_opportunity,
				technical_skills: data.technical_skills,
				professional_objective: data.professional_objective ?? null,
				salary_expectation: data.salary_expectation,
				work_preference: {
					set: data.work_preference
				},
				cv_pdf: data.cv_pdf ?? null,
				user_id: data.user_id,
				experience: {
					create: data.experience ?? []
				},
				education: {
					create: data.education ?? []
				}
			}
		});
	
		return profile;
	}

	async UserUpdateProfile(data: Partial<IntUserUpdateProfile>, profileId: string) {
		console.log(data.experience, data.education);

		const { experience, education, ...rest } = data;


		if(typeof experience !== "undefined" && typeof education !== "undefined" ) {
			const profile = await prisma.profile.update({
				where: {
					id: profileId
				},
				data: {
					...rest,
					experience: {
						upsert: experience?.map((item) => ({
							where: { id: item.id },
							update: {
								title: item.title,
								description: item.description
							},
							create: {
								title: item.title ? item.title : "",
								description: item.description ? item.description : ""
							}
						}))
					},
					education:{
						upsert: education?.map((item) => ({
							where: { id: item.id },
							update: {
								institution: item.institution,
								type: item.type,
								description_degree: item.description_degree,
								start_date: item.start_date,
								end_date: item.end_date 
							},
							create: {
								institution: item.institution ? item.institution : "",
								type: item.type ? item.type : "",
								description_degree: item.description_degree ? item.description_degree : "",
								start_date: item.start_date ? item.start_date : "",
								end_date: item.end_date ? item.end_date : ""
							}
						}))
					}
				}
			});   
			return profile;
		}

		
		if(typeof experience !== "undefined" && typeof education === "undefined" ) {
			const profile = await prisma.profile.update({
				where: {
					id: profileId
				},
				data: {
					...rest,
					experience: {
						upsert: experience?.map((item) => ({
							where: { id: item.id },
							update: {
								title: item.title,
								description: item.description
							},
							create: {
								title: item.title ? item.title : "",
								description: item.description ? item.description : ""
							}
						}))
					}
				}
			});   
			return profile;
		}

		if(typeof experience === "undefined" && typeof education !== "undefined" ) {
			const profile = await prisma.profile.update({
				where: {
					id: profileId
				},
				data: {
					...rest,
					education:{
						upsert: education?.map((item) => ({
							where: { id: item.id },
							update: {
								institution: item.institution,
								type: item.type,
								description_degree: item.description_degree,
								start_date: item.start_date,
								end_date: item.end_date 
							},
							create: {
								institution: item.institution ? item.institution : "",
								type: item.type ? item.type : "",
								description_degree: item.description_degree ? item.description_degree : "",
								start_date: item.start_date ? item.start_date : "",
								end_date: item.end_date ? item.end_date : ""
							}
						}))
					}
				}
			});   
			return profile;
		}

		const profile = await prisma.profile.update({
			where: {
				id: profileId
			},
			data: {
				...rest,
			}
		});   

		return profile;

	}

	async UserVerifyProfileExistById(profileId: string) {
		const profile = await prisma.profile.findUnique({
			where: {
				id: profileId
			}
		});

		if(!profile) throw new Error("Perfil não encontrado!");

		return;
	}

	async RecruiterViewProfile(profileId: string) {
		const profile = await prisma.recruiterProfile.findUnique({
			where:{
				id: profileId
			}
		});

		if(!profile) throw new Error("Esse perfil de recrutador não existe");

		return profile;
	}
	
	async RecruiterCreateProfile(data:IntRecruiterCreateProfile){
		const recruiterProfile = await prisma.recruiterProfile.create({
			data:data
		});

		return recruiterProfile;
	}
	
	async RecruiterUpdateProfile(data: Partial<IntRecruiterUpdateProfile>) {

		const { profileId, ...rest } = data;

		const profile = await prisma.recruiterProfile.update({
			where: {
				id: profileId
			},
			data: {
				...rest,
			}
		});   

		return profile;

	}

	async RecruiterVerifyProfileExistById(recruiterProfileId: string) {
		const recruiterProfile = await prisma.recruiterProfile.findUnique({
			where: {
				id: recruiterProfileId
			}
		});

		if(!recruiterProfile) throw new Error("Perfil de recrutador não encontrado!");

		return;
	}

}