import { ObjectId } from "mongodb";
import db from "../../dbConnection/dbConnection.js";

// ^ get all cars
export async function getAllCars(req, res) {
  const cars = await db.collection("cars").find().toArray();
  res.json({ message: "success", cars });
}

// ^ add new car
export async function addCar(req, res) {
  const result = await db.collection("cars").insertOne(req.body);
  res.status(201).json({ message: "success", result });
}

// ^ get car by id
export async function getCarById(req, res) {
  const result = await db
    .collection("cars")
    .findOne({ _id: new ObjectId(req.params.carId) });
  if (result) return res.json({ message: "success", result });
  res.status(404).json({ message: "car is not found" });
}

// ^ update car
export async function updateCar(req, res) {
  const result = await db
    .collection("cars")
    .updateOne({ _id: new ObjectId(req.params.carId) }, { $set: req.body });
  res.json({ message: "success", result });
}

// ^ delete car
export async function deleteCar(req, res) {
  const result = await db
    .collection("cars")
    .deleteOne({ _id: new ObjectId(req.params.carId) });
  res.json({ message: "success", result });
}

// ^ Get all cars whose model is ‘Honda’ and ‘Toyota’
export async function getHondaToyotaCars(req, res) {
  const { model } = req.query;

  const cars = await db
    .collection("cars")
    .find({ model: { $in: [model[0], model[1]] } })
    .toArray();
  res.json({ message: "success", cars });
}

// ^ Get Available Cars of a Specific Model.
export async function getAvailableOfSpecificModel(req, res) {
  const { model } = req.query;

  const cars = await db
    .collection("cars")
    .find({ model: model, rentalStatus: "available" })
    .toArray();
  res.json({ message: "success", cars });
}

// ^ Get Cars that are Either rented or of a Specific Model.
export async function getRentedOrSpecificModel(req, res) {
  const { model } = req.query;

  const cars = await db
    .collection("cars")
    .find({ $or: [{ model: model }, { rentalStatus: "rented" }] })
    .toArray();
  res.json({ message: "success", cars });
}
// ^ Get Available Cars of a Specific Model or Rented Cars of a Specific Model
export async function getRentedOrAvailable(req, res) {
  const { model, status } = req.query;

  const cars = await db
    .collection("cars")
    .find({ model: model, rentalStatus: status })
    .toArray();
  res.json({ message: "success", cars });
}
