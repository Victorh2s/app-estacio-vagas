import { StatusApplication } from "@prisma/client";

export interface IntCreateApplication {
    user_id: string;
    job_offer_id: string;
}

export interface IntUpdateApplication {
    application_id: string;
    status: StatusApplication;
}

export interface IntPrismaApplicationRepository {
    ViewApplication(applicationId: string): Promise<{
        id: string;
        user_id: string;
        job_offer_id: string;
        status: StatusApplication;
        createdAt: Date;
    } | null>

    ViewApplicationsByUser(userId: string): Promise<{
        id: string;
        user_id: string;
        job_offer_id: string;
        status: StatusApplication;
        createdAt: Date;
    }[]>

    ViewApplicationsByJob(jobId: string): Promise<{
        id: string;
        user_id: string;
        job_offer_id: string;
        status: StatusApplication;
        createdAt: Date;
    }[]>

    CreateApplication(data: IntCreateApplication): Promise<{
        id: string;
        user_id: string;
        job_offer_id: string;
        status: StatusApplication;
        createdAt: Date;
    }>

    UpdateApplication(data: IntUpdateApplication): Promise<{
        id: string;
        user_id: string;
        job_offer_id: string;
        status: StatusApplication;
        createdAt: Date;
    }>

    RemoveApplication(applicationId: string): Promise<{
        id: string;
        user_id: string;
        job_offer_id: string;
        status: StatusApplication;
        createdAt: Date;
    }>

}