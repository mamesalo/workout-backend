import express from "express";
import { PORT, MONGODB_URL } from "./config.js";
import mongoose from "mongoose";
import activitiesRoute from "./routes/activitiesRoute.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/activities", activitiesRoute);
app.use("/user", userRoute);

app.get("/", (req, res) => {
  return res.status(200).send("Welcome To MERN Stack Tutorial");
});

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("App connected to database");

    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
