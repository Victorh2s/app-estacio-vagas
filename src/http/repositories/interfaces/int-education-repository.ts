import { Prisma } from "@prisma/client";

export interface IntCreateAndUpdateEducation{
    degree: string;
    type: string;
    start_date: string;
    end_date: string;
    description_degree: string;
    profile_id: string;
}


export interface IntPrismaEducationRepository {
    ViewUniqueEducationInProfile(educationId: string): Promise<{
        id: string;
        degree: string;
        type: string;
        start_date: Date;
        end_date: Date;
        description_degree: string;
        profile_id: string;
    } | null>

    ViewEducationInProfile(profileId: string): Promise<{
        id: string;
        degree: string;
        type: string;
        start_date: Date;
        end_date: Date;
        description_degree: string;
        profile_id: string;
    }[]>

    CreateEducationInProfile(data: IntCreateAndUpdateEducation): Promise<{
        id: string;
        degree: string;
        type: string;
        start_date: Date;
        end_date: Date;
        description_degree: string;
        profile_id: string;
    }>

    UpdateEducationInProfile(data: IntCreateAndUpdateEducation, educationId: string): Promise<{
        id: string;
        degree: string;
        type: string;
        start_date: Date;
        end_date: Date;
        description_degree: string;
        profile_id: string;
    }>

    DeleteEducationInProfile(educationId: string): Promise<{
        id: string;
        degree: string;
        type: string;
        start_date: Date;
        end_date: Date;
        description_degree: string;
        profile_id: string;
    }>
   
    DeleteManyEducationInProfile(profileId: string): Promise<Prisma.BatchPayload>

    VerifyEducationById(educationId: string): Promise<void>
}