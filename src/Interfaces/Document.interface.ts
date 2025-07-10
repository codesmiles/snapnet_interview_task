
import { StatusEnum } from '@src/Utils';
import { Document, Schema } from 'mongoose';

export interface IDocument extends Document {
    _id: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId | object,
    documentType: String,
    documentUrl: String,
    status: StatusEnum
}