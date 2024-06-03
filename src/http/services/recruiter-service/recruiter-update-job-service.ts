import { JobOffer } from "@prisma/client";
import { PrismaJobRepository } from "../../repositories/prisma/prisma-job-repository";
import { IntRecruiterUpdateJob } from "../../repositories/interfaces/int-job-repository";
import { PrismaRecruiterRepository } from "@/http/repositories/prisma/prisma-recruiter-repository";

export interface IntRecruiterUpdateJobService extends IntRecruiterUpdateJob{}

function getUpdatedFields(oldData: JobOffer, newData: Partial<JobOffer>): Partial<JobOffer> {
	const updatedFields: Partial<JobOffer> = {};
	const keys = Object.keys(newData) as (keyof JobOffer)[];

	for (const key of keys) {
		const newValue = newData[key];
		const oldValue = oldData[key];

		const isValueNaN = (val: any) => typeof val === "number" && Number.isNaN(val);

		if (newValue !== undefined && newValue !== null && newValue !== oldValue && !isValueNaN(newValue) ) {
			updatedFields[key] = newValue;
		}
	}
	return updatedFields;
}

export class RecruiterUpdateJobService {
	constructor(
		private prismaJobRepository: PrismaJobRepository,
		private prismaRecruiterRepository: PrismaRecruiterRepository
	) {}

  
	async execute(updateJob: IntRecruiterUpdateJobService, userId: string) {

		const { job_id, role_job, company_job, salary, office_location,local, description, requirements, status_job  } = updateJob;

		const oldJob = await this.prismaJobRepository.RecruiterViewUniqueJob(job_id);
		const recruiterProfile = await this.prismaRecruiterRepository.RecruiterViewProfile(userId);

		if(oldJob.recruiter_profile_id !== recruiterProfile.id) throw new Error("Permissão negada: Esse recrutador não tem permissão para atualizar essa vaga de emprego!");

		const updatedFields = getUpdatedFields(oldJob, {
			role_job, 
			company_job, 
			salary, 
			office_location, 
			local,
			description, 
			requirements, 
			status_job 
		});

		const data = {
			...updatedFields
		};

		const newJob = await this.prismaJobRepository.RecruiterUpdateJob(data, job_id);

		return newJob;
	}
}