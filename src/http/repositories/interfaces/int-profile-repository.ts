import { Profile } from "@prisma/client";
import { IntEducation, IntExperience } from "./int-user-repository";

type Location = "PRESENCIAL" | "REMOTO" | "HIBRIDO";


interface Experience {
    title: string;
    description: string;
}

interface Education {
    institution: string;
    type: string;
    start_date: string;
    end_date: string;
    description_degree: string;
}

export interface IntUserCreateProfile {
    profile_picture?: string | null;
    curse: string;
    type_curse: string;
    career_opportunity: string;
    technical_skills: string;
    professional_objective?: string | null;
    salary_expectation: number;
    work_preference: Location[];
    cv_pdf?: string | null;
    user_id: string;
    experience?: Experience[];
    education?: Education[];
}

export interface IntRecruiterCreateProfile {
    user_id: string;
    company_recruiter: string, 
    role_recruiter: string, 
    description_recruiter: string;
}


export interface IntUserUpdateProfile {
    curse?: string;
    type_curse?: string;
    career_opportunity?: string;
    technical_skills?: string;
    professional_objective?: string | undefined | null;
    salary_expectation?: number;
    work_preference?: Location[];
    profile_picture?: string | null;
    cv_pdf?: string | null;
    experience?: IntExperience[];
    education?: IntEducation[];
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



export interface IntPrismaProfilesRepository {

    UserViewProfile(profileId: string): Promise <Profile>

    UserCreateProfile(data: IntUserCreateProfile): Promise<Profile>

    UserUpdateProfile(data: IntUserUpdateProfile, profileId: string): Promise<{
        id: string;
        profile_picture: string | null;
        curse: string;
        type_curse: string;
        career_opportunity: string;
        technical_skills: string;
        professional_objective: string | null;
        salary_expectation: number;
        work_preference: Location[];
        cv_pdf: string | null;
        user_id: string;
    } | void>

    RecruiterViewProfile(profileId: string): Promise<{
        id: string;
        company_recruiter: string;
        role_recruiter: string;
        description_recruiter: string;
        user_id: string;
    }>

    UserVerifyProfileExistById(profileId: string): Promise<void>

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