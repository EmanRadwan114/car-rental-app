import { Router } from "express";
import {
  addCar,
  deleteCar,
  getAllCars,
  getCarById,
  getHondaToyotaCars,
  updateCar,
} from "./car.controllers.js";

const carRouter = Router();

carRouter.route("/").get(getAllCars).post(addCar);
carRouter.route("/:carId").get(getCarById).put(updateCar).delete(deleteCar);
carRouter.get("/honda-toyota", getHondaToyotaCars);
export default carRouter;
