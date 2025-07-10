import { Application, Router } from "express";
// import { verifyUser } from "../Utils";
import { loginUser,createUser } from "../Controllers";


const routes = Router();


routes.post("/signup", createUser as Application);

routes.post("/login", loginUser as Application);


// routes.get("/profile", verifyUser as Application, getUserProfile as Application)

export default routes;