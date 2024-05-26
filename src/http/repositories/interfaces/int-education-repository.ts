import { Prisma } from "@prisma/client";

export interface IntCreateAndUpdateEducation{
    profile_id: string;
    institution: string;
    type: string;
    start_date: string;
    end_date: string;
    description_degree: string;
}


export interface IntPrismaEducationRepository {
    ViewUniqueEducationInProfile(educationId: string): Promise<{
        id: string;
        institution: string;
        type: string;
        start_date: string;
        end_date: string;
        description_degree: string;
        profile_id: string;
    } | null>

    ViewEducationInProfile(profileId: string): Promise<{
        id: string;
        institution: string;
        type: string;
        start_date: string;
        end_date: string;
        description_degree: string;
        profile_id: string;
    }[]>

    CreateEducationInProfile(data: IntCreateAndUpdateEducation): Promise<{
        id: string;
        institution: string;
        type: string;
        start_date: string;
        end_date: string;
        description_degree: string;
        profile_id: string;
    }>

    UpdateEducationInProfile(data: IntCreateAndUpdateEducation, educationId: string): Promise<{
        id: string;
        institution: string;
        type: string;
        start_date: string;
        end_date: string;
        description_degree: string;
        profile_id: string;
    }>

    DeleteEducationInProfile(educationId: string): Promise<{
        id: string;
        institution: string;
        type: string;
        start_date: string;
        end_date: string;
        description_degree: string;
        profile_id: string;
    }>
   
    DeleteManyEducationInProfile(profileId: string): Promise<Prisma.BatchPayload>

    VerifyEducationById(educationId: string): Promise<void>
}