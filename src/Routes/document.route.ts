// src/documents/document.controller.ts
import { Request, Response } from 'express';
// import * as documentService from './document.service';

// export const uploadDocument = async (req: Request, res: Response) => {
//     const { documentType, documentUrl } = req.body;
//     const userId = req.user.id;

//     const doc = await documentService.createDocument(userId, documentType, documentUrl);
//     res.status(201).json(doc);
// };

// export const getMyDocuments = async (req: Request, res: Response) => {
//     const userId = req.user.id;
//     const docs = await documentService.getUserDocuments(userId);
//     res.json(docs);
// };

// export const getAllDocuments = async (req: Request, res: Response) => {
//     const { status, page = 1, limit = 10 } = req.query;
//     const docs = await documentService.getAllDocuments(
//         status as string,
//         parseInt(page as string, 10),
//         parseInt(limit as string, 10)
//     );
//     res.json(docs);
// };
