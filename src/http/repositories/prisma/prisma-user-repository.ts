import { PrismaClient } from "@prisma/client";
import {  IntPrismaUserRepository, IntUpdateUser, IntCreateUser } from "../interfaces/int-user-repository";

const prisma = new PrismaClient();



export class PrismaUserRepository implements IntPrismaUserRepository{

	async GetUsers() {
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
								degree: true,
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
			},
		}); 
	}

	async GetUser(id: string) {
		const user = await prisma.user.findUnique({
			where: { id },
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
								degree: true,
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
			}
		});

		if (!user) {
			throw new Error("Usuário não encontrado!");
		}

		return user;
	}

	
	async CreateUser({name, email, cpf, estacio_student, password, role}: IntCreateUser){
		await prisma.user.create({
			data:{
				name, 
				email, 
				cpf, 
				estacio_student, 
				password, 
				role
			}
		});
		return; 
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

	async VerifyUserExist(id: string) {
		const user = await prisma.user.findUnique({
			where:{
				id
			},
            
		});

		if(!user) {
			throw new Error("Esse usuário não existe.");
		}
        
		return;
	}

	async CpfAlreadyExist(cpf: string) {
		const cpf_already_exist = await prisma.user.findUnique({
			where:{
				cpf
			}
		});

		if(cpf_already_exist) throw new Error("Esse CPF já está cadastrado!");
        
		return;
	}

	async EmailAlreadyExist(email: string) {
		const email_already_exist = await prisma.user.findUnique({
			where:{
				email
			}
		});

		if(email_already_exist) throw new Error("Esse Email já está cadastrado!");
        
		return;
	}

	async GetUserWithPassword(id: string) {
		const user = await prisma.user.findUnique({
			where: { id },
		});

		return user;
	}

}