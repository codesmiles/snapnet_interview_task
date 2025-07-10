import { IDocument } from "../Interfaces";
import mongoose, { Schema } from 'mongoose';
import { StatusEnum } from "../Utils";


// Schema definition
const UserDocumentSchema = new Schema(
    {
        user: {
            type: String,
            required: true,
            ref: "User"
        },
        docimentType: {
            type: String,
            required: true,
        },
        documentUrl: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: Object.values(StatusEnum),
            default: StatusEnum.PENDING,
        }

    },
    {
        timestamps: true,
    }
);



export const UserDocument = mongoose.model<IDocument>("UserDocument", UserDocumentSchema);