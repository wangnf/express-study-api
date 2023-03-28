import jwt from "jsonwebtoken";

import db from "../connect.js";

export const getPosts = (req, res) => {
    console.log(req.cookies.accessToken)
  if (!req.cookies.accessToken) res.status(401).json("未登录！");

  jwt.verify(req.cookies.accessToken, "secretkey", (err, userInfo) => {
    if (err) res.status(403).json("token失效！");

    const q =
      "select posts.*, name, profilePic from posts JOIN users on (posts.userId=users.id)";

    db.query(q, [userInfo.id], (error, data) => {
      if (error) res.status(500).json(error);
      res.status(200).json(data);
    });
  });
};
