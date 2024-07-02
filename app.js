import express from "express";
import cors from "cors";
import carRouter from "./modules/car/car.routes.js";
import userRouter from "./modules/user/user.routes.js";
import rentalRouter from "./modules/rental/rental.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(express.json());
app.use("/cars", carRouter);
app.use("/rentals", rentalRouter);
app.use("/users", userRouter);

app.listen(PORT, (err) => {
  if (err) return console.log("there is an error", err);
  console.log(`server is running on port ${PORT}`);
});
