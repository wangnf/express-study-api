import db from "../connect.js";
import bcrypt from "bcryptjs";

export const register = (req, res) => {
  const q = "select * from users where username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("用户已存在！");
    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "insert into users (`username`, `password`, `email`, `name`) value (?)";

    const values = [
      req.body.username,
      hashedPassword,
      req.body.email,
      req.body.name,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("用户创建成功！");
    });
  });
};

export const login = (req, res) => {
  res.send("login");
};

export const logout = () => {
  res.send("logout");
};
