import { User, UserDocument } from "../Models";
import {
    UserRoles,
    signJwt,
    comparePassword,
    CrudOperationsEnum,
} from "../Utils";
import { IDocument } from "../Interfaces";
import BaseService from "./_BaseService";



abstract class DocumentAbstract extends BaseService<Partial<IDocument>, IDocument> {
    constructor() {
        super({
            Model: UserDocument,
            allowedOperations: [
                CrudOperationsEnum.CREATE,
                CrudOperationsEnum.UPDATE,
                CrudOperationsEnum.DELETE,
                CrudOperationsEnum.FINDSINGLE,
            ],
            serializer: [
                "createdAt",
                "updatedAt",
                "deletedAt",
                "isDeleted",
                "__v"
            ],
        });
    }
   
}

export class DocumentService extends DocumentAbstract {
    constructor() {
        super();
    }
}
