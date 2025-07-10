import { Response } from "express";
import { validator, ResponseBuilder } from "../Utils";
import { loginSchema } from "../Dtos";
import { DocumentService } from "../Services";
import { CustomRequest } from "../Interfaces";

const documentService = new DocumentService()
export const uploadDocument = async (req: CustomRequest, res: Response) => {
    // const { documentType, documentUrl } = req.body;
    // const userId = req.user.id;

    // const doc = await documentService.create(userId, documentType, documentUrl);
    // res.status(201).json(doc);
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
