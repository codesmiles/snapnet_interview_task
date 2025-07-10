import Joi from "joi";


export const createDocumentSchema = Joi.object({
    documentType: Joi.string().required(),
    documentUrl: Joi.string().required(),
});
