import { Router } from "express";
import {
  addRental,
  deleteRental,
  getAllRentals,
  getRentalById,
  updateRental,
} from "./rental.controller.js";
import { isCarRented } from "./rental.middleware.js";

const rentalRouter = Router();

rentalRouter.route("/").get(getAllRentals).post(isCarRented, addRental);
rentalRouter
  .route("/:rentalId")
  .get(getRentalById)
  .put(updateRental)
  .delete(deleteRental);

export default rentalRouter;
