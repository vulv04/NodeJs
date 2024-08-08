import { Router } from "express";
import carRouter from "./car";
import authRouter from "./auth";
const router = Router();

router.use("/cars", carRouter);
router.use("/auth", authRouter);

export default router;
