import { Schema, ValidationError } from "joi";
import { ResponseBuilder } from "./Response.util";

export const validator = <T>( schema: Schema, data: T ) => {
  let errorResponse: ResponseBuilder<ValidationError | unknown>;
  let errorData:unknown;
  try {
    const { error } = schema.validate(data);
    if (error) {
      errorData = error.details.map((err) => err.message);
      errorResponse = new ResponseBuilder("Validation error", 400, errorData);
      return errorResponse.toJson();
    }
    return null;
  } catch (err) {
    errorData = err instanceof Error ? err.message : "Unknown error";
    console.error("Validation Error:", err);
    errorResponse = new ResponseBuilder("Invalid payload", 400, errorData);
    return errorResponse.toJson();
  }
};