import { Router } from "express";
import { checkEmailExists, isUserOwner } from "./user.middleware.js";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  signin,
  signup,
  updateUser,
} from "./user.controllers.js";

const userRouter = Router();
userRouter.post("/signup", checkEmailExists, signup);
userRouter.post("/signin", signin);

userRouter
  .route("/:userId")
  .get(getUserById)
  .put(isUserOwner, updateUser)
  .delete(isUserOwner, deleteUser);

userRouter.get("/", getAllUsers);
export default userRouter;
