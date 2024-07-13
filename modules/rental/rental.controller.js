import { ObjectId } from "mongodb";
import db from "../../dbConnection/dbConnection.js";

// ^ get all rentals
export async function getAllRentals(req, res) {
  const result = await db.collection("rentals").find().toArray();
  res.json({ message: "success", result });
}

// ^ add new rental
export async function addRental(req, res) {
  req.body.carId = new ObjectId(req.body.carId);
  req.body.customerId = new ObjectId(req.body.customerId);
  const result = await db.collection("rentals").insertOne(req.body);
  res.status(201).json({ message: "success", result });
}

// ^ get rental by id
export async function getRentalById(req, res) {
  const result = await db
    .collection("rentals")
    .findOne({ _id: new ObjectId(req.params.rentalId) });
  if (result) return res.json({ message: "success", result });
  res.status(404).json({ message: "rental is not found" });
}

// ^ update rental
export async function updateRental(req, res) {
  const result = await db
    .collection("rentals")
    .updateOne({ _id: new ObjectId(req.params.rentalId) }, { $set: req.body });
  res.json({ message: "success", result });
}

// ^ delete rental
export async function deleteRental(req, res) {
  const result = await db
    .collection("rentals")
    .deleteOne({ _id: new ObjectId(req.params.rentalId) });
  res.json({ message: "success", result });
}
