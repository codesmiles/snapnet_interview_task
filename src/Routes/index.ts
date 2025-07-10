import { verifyUser } from "../Middlewares";
import authRoute from "./auth.route";
import documentRoutes from "./document.route";
import { Router,Application } from "express";

const router = Router();

router.use("/auth", authRoute);
router.use('/documents', verifyUser as Application, documentRoutes);

export default router;