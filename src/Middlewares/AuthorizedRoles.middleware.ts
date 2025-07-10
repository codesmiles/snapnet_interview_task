import { Response, NextFunction } from "express";
// import { ErrorResponse } from "../Responses";
import { checkJwt, ResponseBuilder,UserRoles} from "../Utils";

import { CustomRequest,UserTokenDecrypted } from "../Interfaces";
// import { ROUTES, UserRoles } from "./constants";


export const verifyUser = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    let errorResponse: ResponseBuilder<unknown>;
    try {
        if (!req.headers.authorization) {
            errorResponse = new ResponseBuilder(ResponseBuilder.ERROR_MESSAGE, 401, null);
            return res.status(401).json(errorResponse.toJson());
        }
        const token = checkJwt(
            req.headers.authorization?.split(" ")[1]
        ) as UserTokenDecrypted;
        if (!token) {
            errorResponse = new ResponseBuilder(ResponseBuilder.ERROR_MESSAGE, 401, null);
            return res.status(401).json(errorResponse.toJson());
        }
        req.user = token;
        next();
    } catch (err) {
        errorResponse = new ResponseBuilder(ResponseBuilder.ERROR_MESSAGE, 400, err);
        return res.status(400).json(errorResponse.toJson());
    }
};

export const authorizeRoles = (...allowedRoles: UserRoles[]) => {
    let errorResponse: ResponseBuilder<unknown>;
    return async (req: CustomRequest, res: Response, next: NextFunction) => {
        const userRole = req.user?.role;

        if (!userRole || !allowedRoles.includes(userRole)) {
            errorResponse = new ResponseBuilder(ResponseBuilder.ERROR_MESSAGE, 403, null);
            return res.status(403).json(errorResponse.toJson());
        }

        next();
    };
}