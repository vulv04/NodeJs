import express from "express";
import router from "./routes/index";
import dotenv from "dotenv";
import connectMongoDB from "./config/dbconfig";
const app = express();
dotenv.config();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/db_cars";
connectMongoDB(dbUrl);
app.use("/", router);
export const viteNodeApp = app;
