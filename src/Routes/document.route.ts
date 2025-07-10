import { Application, Router } from "express";
import { uploadDocument, getDocument } from "../Controllers";


const routes = Router();


routes.post("/", uploadDocument as Application);

routes.get("/:id", getDocument as Application);


export default routes;