export * from "./Types";
export * from "./request.model";
export * from "./User.interface";
export * from "./Document.interface";

export interface PaginatedResponse<T> {
    payload: T[];
    meta: {
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    };
}