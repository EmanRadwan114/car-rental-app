import { Router } from "express";
import {
  addCar,
  deleteCar,
  getAllCars,
  getAvailableOfSpecificModel,
  getCarById,
  getHondaToyotaCars,
  getRentedOrAvailable,
  getRentedOrSpecificModel,
  updateCar,
} from "./car.controllers.js";

const carRouter = Router();

carRouter.route("/").get(getAllCars).post(addCar);
carRouter.get("/car", getHondaToyotaCars);
carRouter.get("/available", getAvailableOfSpecificModel);
carRouter.get("/search", getRentedOrSpecificModel);
carRouter.get("/status", getRentedOrAvailable);
carRouter.route("/:carId").get(getCarById).put(updateCar).delete(deleteCar);

export default carRouter;
