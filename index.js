import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { PORT } from './config.js'

const app = express();

import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";


// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log("api is working!");
});
