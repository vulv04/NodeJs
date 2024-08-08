import { Router } from "express";
import AuthController from "../controllers/authController";
const carRouter = Router()

const authController = new AuthController()

carRouter.post("/register",authController.register)
carRouter.post("/login",authController.login)

export default carRouter