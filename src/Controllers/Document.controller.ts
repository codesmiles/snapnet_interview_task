import { Response } from "express";
import { validator, ResponseBuilder } from "../Utils";
import { DocumentService } from "../Services";
import { CustomRequest } from "../Interfaces";
import { createDocumentSchema } from "../Dtos";

const documentService = new DocumentService()
export const uploadDocument = async (req: CustomRequest, res: Response) => {
    let successResponse: ResponseBuilder<string | object>;
    let errorResponse: ResponseBuilder<unknown>;

    // validate requests
    const validate_req_payload = validator(createDocumentSchema, req.body);
    if (validate_req_payload) {
        return res.status(400).json(validate_req_payload);
    }
    
    const doc = await documentService.create({ user: req.user.id, ...req.body });
    
    // create a queue system to verify the document and stimulate a delay for the queue

    successResponse = new ResponseBuilder(ResponseBuilder.SUCCESS_MESSAGE, 201, doc);
    return res.status(201).json(successResponse.toJson());

};

export const getDocument = async (req: CustomRequest, res: Response) => {
    // const userId = req.user.id;
    // const docs = await documentService.findSingle(userId);
    // res.json(docs);
};

export const getAllDocuments = async (req: CustomRequest, res: Response) => {
    // const { status, page = 1, limit = 10 } = req.query;
    // const docs = await documentService.getAllDocuments(
    //     status as string,
    //     parseInt(page as string, 10),
    //     parseInt(limit as string, 10)
    // );
    // res.json(docs);
};
