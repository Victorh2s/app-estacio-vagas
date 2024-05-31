import { Role } from "@prisma/client";

export interface IntCreateUser{
	name: string;
	email: string;
	cpf: string;
	estacio_student: boolean;
	password: string;
	role: Role;
}

export interface IntPrismaAuthRepository {
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

    VerifyUserExist(id: string): Promise<void>

    CpfAlreadyExist(cpf: string): Promise<void>

    EmailAlreadyExist(email: string): Promise<void>
}