import { ObjectId } from "mongodb";
import db from "./../../dbConnection/dbConnection.js";

export async function isCarRented(req, res, next) {
  const result = await db
    .collection("cars")
    .findOne({ _id: new ObjectId(req.body.carId) });
  if (result.rentalStatus === "rented")
    return res.status(409).json({ message: "car is already rented" });
  next();
}
