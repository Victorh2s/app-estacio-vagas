import { Location } from "@prisma/client";
import { IntExperience } from "../repositories/interfaces/int-user-repository";

export interface IntUpdateProfileService {
    curse?: string;
    type_curse?: string;
    career_opportunity?: string;
    technical_skills?: string;
    professional_objective?: string;
    salary_expectation?: number;
    work_preference?: Location[];
    profile_picture?: string;
    cv_pdf?: string;
    experience?: IntExperience[];
    education?: IntEducation[];
    profileId: string;
}

export interface IntUserCreateProfileService {
    curse: string;
    type_curse: string;
    career_opportunity: string;
    experience: IntExperience[];
    technical_skills: string;
    education: IntEducation[];
    professional_objective: string;
    salary_expectation: number;
    work_preference: Location[];
    profile_picture: string;
    cv_pdf: string;
    user_id: string;
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