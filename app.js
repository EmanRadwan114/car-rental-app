import express from "express";
import cors from "cors";
import carRouter from "./modules/car/car.routes.js";
import userRouter from "./modules/user/user.routes.js";
import rentalRouter from "./modules/rental/rental.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

const maxDurationMiddleware = (req, res, next) => {
  // Set maxDuration in milliseconds (e.g., 30 seconds)
  const maxDuration = 30000;

  // Set a timeout for this request
  setTimeout(() => {
    next(new Error("Request Timeout"));
  }, maxDuration);

  next();
};

// Apply maxDurationMiddleware to all routes
app.use(maxDurationMiddleware);

app.use(cors());

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
