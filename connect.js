import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  port: "3309",
  user: "root",
  password: "w19921222",
  database: "social",
});


export default db;
