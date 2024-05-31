import { JobOffer, PrismaClient } from "@prisma/client";
import { IntPrismaJobRepository, IntRecruiterCreateJob } from "../interfaces/int-job-repository";

const prisma = new PrismaClient();




export class PrismaJobRepository implements IntPrismaJobRepository{
	async ViewJobs() {
		const jobs = await prisma.jobOffer.findMany({
		});

		return jobs;
	}

	async ViewJob(job_id: string) {
		const job = await prisma.jobOffer.findUnique({
			where:{
				id: job_id
			}
		});

		if(!job) throw new Error("Vaga não encontrada!");

		return job;
	}

	async RecruiterViewUniqueJob(jobId: string){
		const findJob = await prisma.jobOffer.findUnique({
			where:{
				id: jobId
			},
			include:{
				applications: true
			}
		});

		if(!findJob) throw new Error("Vaga de emprego não encontrada!");

		return findJob;
	}

	async RecruiterViewManyJobs(recruiterProfileId: string){
		const findManyJobs = await prisma.jobOffer.findMany({
			where:{
				recruiter_profile_id: recruiterProfileId
			},
			include:{
				applications: true
			}
		});

		return findManyJobs;
	}

	async RecruiterCreateJob(data: IntRecruiterCreateJob) {
		const recruiterProfile = await prisma.jobOffer.create({
			data
		});

		return recruiterProfile;
	}

	async RecruiterUpdateJob(data: Partial<JobOffer>, job_id: string) {
		const newJob = await prisma.jobOffer.update({
			data,
			where:{
				id: job_id
			}
		});

		return newJob; 
	}

	async RecruiterDeleteJob(jobId: string){
		return await prisma.jobOffer.delete({where:{
			id: jobId
		}});
	}

}