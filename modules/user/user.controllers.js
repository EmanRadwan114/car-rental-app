import db from "./../../dbConnection/dbConnection.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

// ^ sign up
export async function signup(req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hashedPassword;
  const result = await db.collection("users").insertOne(req.body);
  res.status(201).json({ message: "user added successfully", result });
}

// ^ sign in
export async function signin(req, res) {
  const { email, password } = req.body;
  const result = await db.collection("users").findOne({ email: email });

  if (!result) return res.status(404).json({ message: "email is not found" });
  const isPassCorrect = bcrypt.compareSync(password, result.password);
  if (!isPassCorrect)
    return res.status(401).json({ message: "email or password is incorrect" });
  res.status(201).json({ message: "user logged in successfully", result });
}

// ^ get all users
export async function getAllUsers(req, res) {
  const result = await db
    .collection("users")
    .find({}, { projection: { password: 0 } })
    .toArray();
  res.json({ message: "success", result });
}

// ^ get user by id
export async function getUserById(req, res) {
  const result = await db
    .collection("users")
    .findOne(
      { _id: new ObjectId(req.params.userId) },
      { projection: { password: 0 } }
    );
  if (result) return res.json({ message: "success", result });
  res.status(404).json({ message: "user is not found" });
}

// ^ update user
export async function updateUser(req, res) {
  const result = await db
    .collection("users")
    .updateOne({ _id: new ObjectId(req.params.userId) }, { $set: req.body });
  res.json({ message: "success", result });
}

// ^ delete user
export async function deleteUser(req, res) {
  const result = await db
    .collection("users")
    .deleteOne({ _id: new ObjectId(req.params.userId) });
  res.json({ message: "success", result });
}
