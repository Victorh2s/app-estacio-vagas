
import { Application, Profile, Role } from "@prisma/client";

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

export interface IntUser {
    id: string;
    name: string;
    email: string;
    cpf: string;
    estacio_student: boolean;
    role: Role;
    profile?: IntProfile | null;
    recruiter_profile?: IntRecruiterProfile | null;
    applications: Application[] | null
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


export interface IntUpdateUser {
    id: string;
    name: string;
    email: string;
    cpf: string;
    estacio_student: boolean;
    role: Role;
}


export interface IntProfile {
    id: string;
    profile_picture?: string | null;
    curse: string;
    type_curse: string;
    career_opportunity: string;
    experience: IntExperience[];
    technical_skills: string;
    education: IntEducation[];
    professional_objective?: string | null;
    salary_expectation: number;
    work_preference: Location[];
    cv_pdf?: string | null;
    user_id: string;
}

export interface IntExperience {
    id: string;
    title: string;
    description: string;
    profile_id: string;
}

export interface IntEducation {
    id: string;
    institution: string;
    type: string;
    start_date: string;
    end_date: string;
    description_degree: string;
    profile_id: string;
}

export interface IntRecruiterProfile {
    id: string;
    company_recruiter: string;
    role_recruiter: string;
    jobOffers: IntJobOffer[];
    user_id: string;
}

export interface IntJobOffer {
    id: string;
    role_job: string;
    company_job: string;
    salary: number;
    office_location: Location[];
    description: string;
    requirements: string;
    recruiter_profile_id: string;
}

export interface IntPrismaUserRepository {

    ViewUsers(): Promise<IntUser[]>

    ViewUser(id: string): Promise<IntUser | null>

    UpdateUser(id: string, data: IntUpdateUser): Promise<void>

    DeleteUser(id: string): Promise<void>

    UserViewProfile(userId: string): Promise <Profile | null>

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

    UserVerifyProfileExistById(profileId: string): Promise<void>
}