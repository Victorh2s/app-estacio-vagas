import { Prisma } from "@prisma/client";

export interface IntCreateAndUpdateExperience{
    curse: string;
    title: string;
    description: string;
    profile_id: string;
}


export interface IntPrismaExperienceRepository {
    ViewExperienceInProfile(profileId: string): Promise<{
        id: string;
        title: string;
        description: string;
        profile_id: string;
    }[]>

    ViewUniqueExperienceInProfile(experienceId: string): Promise<{
        id: string;
        title: string;
        description: string;
        profile_id: string;
    } | null>

    CreateExperienceInProfile(data: IntCreateAndUpdateExperience): Promise<{
        id: string;
        title: string;
        description: string;
        profile_id: string;
    }>

    UpdateExperienceInProfile(data: IntCreateAndUpdateExperience, experienceId: string): Promise<{
        id: string;
        title: string;
        description: string;
        profile_id: string;
    }>

    DeleteManyExperienceInProfile(profileId: string): Promise<Prisma.BatchPayload>
   
    DeleteExperienceInProfile(experienceId: string): Promise<{
        id: string;
        title: string;
        description: string;
        profile_id: string;
    }>

    VerifyExperienceExistById(experienceId: string): Promise<void>
}