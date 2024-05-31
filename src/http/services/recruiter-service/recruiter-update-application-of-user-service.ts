import { StatusApplication } from "@prisma/client";
import { PrismaApplicationRepository } from "@/http/repositories/prisma/prisma-application-repository";
import { PrismaRecruiterRepository } from "@/http/repositories/prisma/prisma-recruiter-repository";

export interface IntRecruiterUpdateApplicationOfUserService{
    userId: string;
    applicationId: string;
    status: StatusApplication
}


export class RecruiterUpdateApplicationOfUserService {
	constructor(
		private prismaApplicationRepository: PrismaApplicationRepository,
        private prismaRecruiterRepository: PrismaRecruiterRepository
	) {}

  
	async execute({applicationId, status, userId}: IntRecruiterUpdateApplicationOfUserService) {

		const recruiterProfile = await this.prismaRecruiterRepository.RecruiterViewProfile(userId);

		const application = await this.prismaApplicationRepository.ViewApplication(applicationId);


		const verifyPermissionRecruiter = recruiterProfile.jobOffers.some(jobOffer => jobOffer.id === application?.job_offer_id);

		if(!verifyPermissionRecruiter) {
			throw new Error("Permissão negada: O recrutador não tem permissão para atualizar está candidatura!");
		}


		await this.prismaApplicationRepository.UpdateApplication({application_id: applicationId, status: status});
	
		return;
	}
}