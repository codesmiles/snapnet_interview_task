import { IUser } from "../Interfaces";
import mongoose, { Schema } from 'mongoose';
import { UserRoles } from "../Utils"


// Schema definition
const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            // unique: true,
            trim: true,
            lowercase: true,
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            enum: Object.values(UserRoles),
            default: UserRoles.USER,
        }
    },
    {
        timestamps: true,
    }
);



export const User = mongoose.model<IUser>("User", UserSchema);