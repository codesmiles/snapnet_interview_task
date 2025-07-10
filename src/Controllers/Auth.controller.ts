import { AuthService } from "../Services";
import { Response, Request } from "express";
import { validator, ResponseBuilder } from "../Utils";
import { createUserSchema, loginSchema } from "../Dtos";

const authService = new AuthService();

export const loginUser = async (req: Request, res: Response) => {
    let successResponse: ResponseBuilder<object>;
    let errorResponse: ResponseBuilder<unknown>;
    try {
        // validate requests
        const validate_req_payload = validator(loginSchema, req.body);
        if (validate_req_payload) {
            return res.status(400).json(validate_req_payload);
        }

        const response = await authService.loginUser(req.body);
        if (response == null) {
            errorResponse = new ResponseBuilder(ResponseBuilder.ERROR_MESSAGE, 400, null);
            return res.status(400).json(errorResponse.toJson());
        }

        successResponse = new ResponseBuilder(ResponseBuilder.SUCCESS_MESSAGE, 200, response);
        return res.status(200).json(successResponse.toJson());
    } catch (err) {
        errorResponse = new ResponseBuilder(ResponseBuilder.ERROR_MESSAGE, 400, err);
        return res.status(500).json(errorResponse.toJson());
    }
};

export const createUser = async (req: Request, res: Response) => {
    let successResponse: ResponseBuilder<string | object>;
    let errorResponse: ResponseBuilder<unknown>;
    try {
        // validate requests
        const validate_req_payload = validator(createUserSchema, req.body);
        if (validate_req_payload) {
            return res.status(400).json(validate_req_payload);
        }

        const response = await authService.createUser(req.body);
        if (response == null) {
            errorResponse = new ResponseBuilder(ResponseBuilder.ERROR_MESSAGE, 400, null);
            return res.status(400).json(errorResponse.toJson());
        }

        successResponse = new ResponseBuilder(ResponseBuilder.SUCCESS_MESSAGE, 200, response);
        return res.status(200).json(successResponse.toJson());
    } catch (err) {
        errorResponse = new ResponseBuilder(ResponseBuilder.ERROR_MESSAGE, 400, err);
        return res.status(500).json(errorResponse.toJson());
    }
}