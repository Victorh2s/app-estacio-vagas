
import { Location, Role } from "@prisma/client";

export interface IntUser {
    id: string;
    name: string;
    email: string;
    cpf: string;
    estacio_student: boolean;
    role: Role;
    profile?: IntProfile | null;
    recruiter_profile?: IntRecruiterProfile | null;
}

export interface IntCreateUser{
	name: string;
	email: string;
	cpf: string;
	estacio_student: boolean;
	password: string;
	role: Role;
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

    GetUsers(): Promise<IntUser[]>

    GetUser(id: string): Promise<IntUser | null>

    GetUserByEmailSignIn(email: string): Promise<{
        id: string;
        name: string;
        email: string;
        cpf: string;
        password: string;
        estacio_student: boolean;
        role: Role;
    } | null>

    CreateUser({ name, email, cpf, estacio_student, password, role }: IntCreateUser): Promise<void>

    UpdateUser(id: string, data: IntUpdateUser): Promise<void>

    DeleteUser(id: string): Promise<void>

    VerifyUserExist(id: string): Promise<void>

    CpfAlreadyExist(cpf: string): Promise<void>

    EmailAlreadyExist(email: string): Promise<void>

}