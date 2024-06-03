import { JobOffer, StatusJob } from "@prisma/client";

type Location = "PRESENCIAL" | "REMOTO" | "HIBRIDO";

export interface IntRecruiterCreateJob {
    role_job: string, 
    company_job: string, 
    salary: number, 
    office_location: Location[], 
    local: string | null,
    recruiter_profile_id: string,
    description: string, 
    requirements: string, 
    status_job: StatusJob
}

export interface IntRecruiterUpdateJob {
    job_id: string;
    role_job?: string, 
    company_job?: string, 
    salary?: number, 
    office_location?: Location[], 
    local?: string | null,
    description?: string, 
    requirements?: string, 
    status_job?: StatusJob
}

export interface IntPrismaJobRepository {
    ViewJob(job_id: string): Promise<{
        id: string;
        role_job: string;
        company_job: string;
        salary: number;
        office_location: Location[];
        local?: string | null,
        description: string;
        requirements: string;
        status_job: StatusJob;
        recruiter_profile_id: string;
    }>
    ViewJobs(): Promise<{
        id: string;
        role_job: string;
        company_job: string;
        salary: number;
        office_location: Location[];
        local?: string | null,
        description: string;
        requirements: string;
        status_job: StatusJob;
        recruiter_profile_id: string;
    }[]>
    RecruiterViewUniqueJob(jobId: string): Promise<{
        id: string;
        role_job: string;
        company_job: string;
        salary: number;
        office_location: Location[];
        local?: string | null,
        description: string;
        requirements: string;
        status_job: StatusJob;
        recruiter_profile_id: string;
    }>
    RecruiterViewManyJobs(recruiterProfileId: string): Promise<{
        id: string;
        role_job: string;
        company_job: string;
        salary: number;
        office_location: Location[];
        local?: string | null,
        description: string;
        requirements: string;
        status_job: StatusJob;
        recruiter_profile_id: string;
    }[]>
    RecruiterCreateJob(data: JobOffer): Promise<{
        id: string;
        role_job: string;
        company_job: string;
        salary: number;
        office_location: Location[];
        local?: string | null,
        description: string;
        requirements: string;
        status_job: StatusJob;
        recruiter_profile_id: string;
    }>
    RecruiterUpdateJob(data: Partial<JobOffer>, job_id: string): Promise<{
        id: string;
        role_job: string;
        company_job: string;
        salary: number;
        office_location: Location[];
        local?: string | null,
        description: string;
        requirements: string;
        status_job: StatusJob;
        recruiter_profile_id: string;
    }>
    RecruiterDeleteJob(jobId: string): Promise<{
        id: string;
        role_job: string;
        company_job: string;
        salary: number;
        office_location: Location[];
        local?: string | null,
        description: string;
        requirements: string;
        status_job: StatusJob;
        recruiter_profile_id: string;
    }>
}