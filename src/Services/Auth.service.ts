import { User } from "../Models";
import {
    UserRoles,
    signJwt,
    comparePassword,
    CrudOperationsEnum,
} from "../Utils";
import { IUser } from "../Interfaces";
import BaseService from "./_BaseService";

type LoginPayload={
    email: string,
    password: string
}

export type LoginResponse = {
    role: UserRoles | string;
    token: string;
};


abstract class AuthAbstract extends BaseService<Partial<IUser>, IUser> {
    constructor() {
        super({
            Model: User,
            allowedOperations: [
                CrudOperationsEnum.CREATE,
                CrudOperationsEnum.UPDATE,
                CrudOperationsEnum.FINDSINGLE,
            ],
            serializer: [
                "createdAt",
                "updatedAt",
                "deletedAt",
                "isDeleted",
                "__v"
            ],
        });
    }
    abstract createUser(payload: Partial<IUser>): Promise<IUser | string>;
    abstract loginUser(loginPayload: LoginPayload): Promise<LoginResponse | null>;
}

export class AuthService extends AuthAbstract {
    constructor() {
        super();
    }
    async createUser(payload: Partial<IUser>): Promise<IUser | string> {
        // check if the user already exists
        const findUser = await this.findSingle({ email: payload.email });
        if (findUser) return "User already exists";

        // create user
        const user = this.create(payload)

        return user;
    }

    async loginUser(loginPayload: LoginPayload): Promise<LoginResponse | null> {
        // check if user exists
        const user = await this.findSingle({ email: loginPayload.email });
        if (!user) return null;

        // sign jwt token
        const token = signJwt({
            id: user?._id,
            role: user?.role,
            email: user?.email,
        });

        // compare hashs if password has been updated
        const checkPassword = await comparePassword(
            user.password,
            loginPayload.password
        );
        if (!checkPassword) return null;
        return { role: user.role, token };
    }
}
