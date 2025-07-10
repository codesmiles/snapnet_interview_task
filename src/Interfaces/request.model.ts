import { Request } from 'express';
import { UserTokenDecrypted } from "./Types";

export interface CustomRequest extends Request {
  user: UserTokenDecrypted;
}