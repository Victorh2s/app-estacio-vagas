import { Experience, Prisma } from "@prisma/client";



export interface IntCreateAndUpdateExperience{
    title: string;
    description: string;
    profile_id: string;
}


export interface IntPrismaExperienceRepository {
    ViewExperienceInProfile(profileId: string): Promise<Experience[]>

    ViewUniqueExperienceInProfile(experienceId: string): Promise<Experience | null>

    DeleteManyExperienceInProfile(profileId: string): Promise<Prisma.BatchPayload>
   
    DeleteExperienceInProfile(experienceId: string): Promise<Experience>

    VerifyExperienceExistById(experienceId: string): Promise<void>
}