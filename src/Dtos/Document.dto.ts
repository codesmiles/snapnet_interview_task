import Joi from "joi";


export const documentSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});
