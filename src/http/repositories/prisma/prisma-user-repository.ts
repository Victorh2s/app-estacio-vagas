import { PrismaClient } from "@prisma/client";
import {  IntPrismaUserRepository, IntUpdateUser, IntUserCreateProfile, IntUserUpdateProfile } from "../interfaces/int-user-repository";

const prisma = new PrismaClient();



export class PrismaUserRepository implements IntPrismaUserRepository{

	async ViewUsers() {
		return prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				cpf: true,
				role: true,
				estacio_student: true,
				profile: {
					select: {
						id: true,
						profile_picture: true,
						curse: true,
						type_curse: true,
						career_opportunity: true,
						experience: {
							select: {
								id: true,
								title: true,
								description: true,
								profile_id: true,
							},
						},
						technical_skills: true,
						education: {
							select: {
								id: true,
								institution: true,
								type: true,
								start_date: true,
								end_date: true,
								description_degree: true,
								profile_id: true,
							},
						},
						professional_objective: true,
						salary_expectation: true,
						work_preference: true,
						cv_pdf: true,
						user_id: true,
					},
				},
				recruiter_profile: {
					select: {
						id: true,
						company_recruiter: true,
						role_recruiter: true,
						jobOffers: {
							select: {
								id: true,
								role_job: true,
								company_job: true,
								salary: true,
								office_location: true,
								description: true,
								requirements: true,
								recruiter_profile_id: true,
							},
						},
						user_id: true,
					},
				},
				applications: true
			},
		}); 
	}

	async ViewUser(userId: string) {
		const user = await prisma.user.findUnique({
			where: {
				id: userId 
			},
			select: {
				id: true,
				name: true,
				email: true,
				cpf: true,
				role: true,
				estacio_student: true,
				profile: {
					select: {
						id: true,
						profile_picture: true,
						curse: true,
						type_curse: true,
						career_opportunity: true,
						experience: {
							select: {
								id: true,
								title: true,
								description: true,
								profile_id: true,
							},
						},
						technical_skills: true,
						education: {
							select: {
								id: true,
								institution: true,
								type: true,
								start_date: true,
								end_date: true,
								description_degree: true,
								profile_id: true,
							},
						},
						professional_objective: true,
						salary_expectation: true,
						work_preference: true,
						cv_pdf: true,
						user_id: true,
					},
				},
				recruiter_profile: {
					select: {
						id: true,
						company_recruiter: true,
						role_recruiter: true,
						jobOffers: {
							select: {
								id: true,
								role_job: true,
								company_job: true,
								salary: true,
								office_location: true,
								description: true,
								requirements: true,
								recruiter_profile_id: true,
							},
						},
						user_id: true,
					},
				},
				applications: true
			}
		});

		if (!user) {
			throw new Error("Usuário não encontrado!");
		}

		return user;
	}

	async UpdateUser(id: string, data: IntUpdateUser  ) {

		await prisma.user.update({
			where:{ id },
			data
		});

		return; 
	}

	async DeleteUser(id: string) {
		await prisma.user.delete({
			where: {
				id
			}
		});
		return;
	}

	async UserViewProfile(userId: string) {
		const profile = await prisma.profile.findUnique({
			where:{
				user_id: userId
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

	async UserUpdateProfile(data: Partial<IntUserUpdateProfile>, user_id: string) {
		console.log(data.experience, data.education);

		const { experience, education, ...rest } = data;


		if(typeof experience !== "undefined" && typeof education !== "undefined" ) {
			const profile = await prisma.profile.update({
				where: {
					user_id
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
					user_id
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
					user_id
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
				user_id
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

}