import { Location } from "@prisma/client";

export interface IntCreateAndUpdateProfile{
    curse: string;
    type_curse: string;
    career_opportunity: string;
    technical_skills: string[];
    professional_objective: string;
    salary_expectation: number;
    work_preference: Location[];
    profile_picture?: string;
    cv_pdf?: string;
    user_id: string;
}

export interface IntPrismaProfileRepository {
    CreateProfile(data: IntCreateAndUpdateProfile): Promise<{
        id: string;
        profile_picture: string | null;
        curse: string;
        type_curse: string;
        career_opportunity: string;
        technical_skills: string[];
        professional_objective: string | null;
        salary_expectation: number;
        work_preference: Location[];
        cv_pdf: string | null;
        user_id: string;
    }>

    UpdateProfile(data: IntCreateAndUpdateProfile, profileId: string): Promise<{
        id: string;
        profile_picture: string | null;
        curse: string;
        type_curse: string;
        career_opportunity: string;
        technical_skills: string[];
        professional_objective: string | null;
        salary_expectation: number;
        work_preference: Location[];
        cv_pdf: string | null;
        user_id: string;
    }>

    VerifyProfileExistById(profileId: string): Promise<void>
}