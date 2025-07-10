import { UserRoles } from "../Utils";


export type UserTokenDecrypted = {
    id: string;
    email: string;
    role: UserRoles;
};