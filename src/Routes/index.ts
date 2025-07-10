import authRoute from "./auth.route";
import { Router } from "express";

const router = Router();

router.use("/auth", authRoute);
// app.use('/documents', documentRoutes);

export default router;