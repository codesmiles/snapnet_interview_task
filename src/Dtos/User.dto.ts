import { UserRoles } from "../Utils";
import Joi from "joi";



export const createUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid(...Object.values(UserRoles)).required(),
})
export const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});
