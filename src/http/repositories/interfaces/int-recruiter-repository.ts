import { Application, Location, StatusJob } from "@prisma/client";

export interface IntRecruiterCreateProfile {
    user_id: string;
    company_recruiter: string, 
    role_recruiter: string, 
    description_recruiter: string;
}

export interface IntRecruiterCreateProfile {
    company_recruiter: string, 
    role_recruiter: string, 
    description_recruiter: string;
    user_id: string;
}
export interface IntRecruiterUpdateProfile{
    profileId: string;
    company_recruiter: string, 
    role_recruiter: string, 
    description_recruiter: string;
}

export interface IntPrismaRecruiterRepository {

    RecruiterViewProfile(userId: string): Promise<{
        id: string;
        company_recruiter: string;
        role_recruiter: string;
        description_recruiter: string;
        jobOffers: {
            id: string;
            role_job: string;
            company_job: string;
            salary: number;
            office_location: Location[];
            description: string;
            requirements: string;
            status_job: StatusJob;
            recruiter_profile_id: string;
            applications: Application[]
        }[];
        user_id: string;
    }>

    RecruiterCreateProfile(data: IntRecruiterCreateProfile): Promise<{
        id: string;
        company_recruiter: string;
        role_recruiter: string;
        description_recruiter: string;
        user_id: string;
    }>

    RecruiterUpdateProfile(data: Partial<IntRecruiterUpdateProfile>): Promise<{
        id: string;
        company_recruiter: string;
        role_recruiter: string;
        description_recruiter: string;
        user_id: string;
    }>

    RecruiterVerifyProfileExistById(recruiterProfileId: string): Promise<void>
}