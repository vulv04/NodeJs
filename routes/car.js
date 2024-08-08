import { Router } from "express";
import CarController from "../controllers/carController";
const carRouter = Router();

const carController = new CarController();

carRouter.get("/", carController.getAllCar);
carRouter.get("/:id", carController.getDetailCar);
carRouter.post("/", carController.createCar);
carRouter.put("/:id", carController.updateCar);
carRouter.delete("/:id", carController.deleteCar);

export default carRouter;
