import db from "./../../dbConnection/dbConnection.js";
import { ObjectId } from "mongodb";
export async function checkEmailExists(req, res, next) {
  const result = await db
    .collection("users")
    .find(
      { email: req.body.email },
      { password: 0, phoneNumber: 0, name: 1, email: 1 }
    )
    .toArray();
  if (result.length !== 0)
    return res.status(401).json({ message: "email already exists", result });
  next();
}

export function isUserOwner(req, res, next) {
  const result = db
    .collection("users")
    .findOne({ _id: new ObjectId(req.params.userId) });
  if (!result)
    return res
      .status(401)
      .json({ message: "you can't update or delete another user", result });
  next();
}
