import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { PORT } from "./config.js";

const app = express();

import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

//express后端配置：
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true"); //服务端允许携带cookie
  next();
  // res.header("Access-Control-Allow-Origin", "*");  //允许的访问域
  // res.header("Access-Control-Allow-Origin", req.headers.origin);  //允许的访问域
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");  //访问头
  // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  //访问方法
  // res.header("X-Powered-By",' 3.2.1');
  // res.header("Content-Type", "application/json;charset=utf-8");
  // if (req.method == 'OPTIONS') {
  //     res.header("Access-Control-Max-Age", 86400);
  //     res.sendStatus(204); //让options请求快速返回.
  // }
  // else {
  //     next();
  // }
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true); //服务端允许携带cookie
  next();
});

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
  console.log("api is working!");
});
