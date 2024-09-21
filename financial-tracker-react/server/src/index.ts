import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import financialRecordRouter from "./routes/financial-records";

dotenv.config();
const app: Express = express();
const port = process.env.PORT ?? 3001;

app.use(express.json());
app.use(cors());

const mongoURI: string = process.env.MONGO_URL ?? "";

if (mongoURI) {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("CONNECTED TO MONGODB!"))
    .catch((err) => console.error("Failed to Connect to MongoDB:", err));
}

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
