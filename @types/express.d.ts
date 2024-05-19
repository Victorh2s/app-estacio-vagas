/* eslint-disable no-unused-vars */

import { Role } from "@prisma/client";

interface auth_routes {
    userId: string;
    token: string;
    role: Role
}

declare namespace Express {
export interface Request {
    auth_routes: auth_routes
}
}