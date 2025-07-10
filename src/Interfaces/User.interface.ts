import { UserRoles } from '../Utils';
import { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    _id: Schema.Types.ObjectId;
    role: UserRoles;
    email: string;
    name: string;
    password: string;
}
