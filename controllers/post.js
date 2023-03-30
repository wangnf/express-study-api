import jwt from "jsonwebtoken";
import moment from "moment/moment.js";

import db from "../connect.js";

export const getPosts = (req, res) => {
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

export const addPost = (req, res) => {
  if (!req.cookies.accessToken) res.status(401).json("未登录！");

  jwt.verify(req.cookies.accessToken, "secretkey", (err, userInfo) => {
    if (err) res.status(403).json("token失效！");

    const q = "insert into posts (`desc`, `img`, `createdAt`, `userId`) values (?)"

    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format('YYYY-MM-DD HH-mm-ss'),
      userInfo.id
    ]


    db.query(q, [values], (err,data) => {
      if(err) res.status(500).json(err)
      res.status(200).json('post新增成功！')
    })
  });
};
