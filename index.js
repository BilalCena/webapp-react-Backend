const mysql = require("mysql");
const cors = require("cors");
const express = require("express");
const app = express();
const bodypar = require("body-parser");
app.use(cors());
app.use(bodypar.json());
var mysqlconnec = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "webapp",
  multipleStatements: true,
});

mysqlconnec.connect((err) => {
  if (!err) {
    console.log("connected successfully");
  } else {
    console.log("errorr" + JSON.stringify(err, undefined, 2));
  }
});
app.listen(9004, () => console.log("Express is running"));

app.get("/", (req, res) => {
  mysqlconnec.query("Select * from users", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});
app.post("/login", (req, res) => {
  let a = req.body;
  mysqlconnec.query(
    "Select * from users where Email =? and Password = ?",
    [a.Email, a.Password],
    (err, row, field) => {
      if (row.length > 0) {
        res.send("Success");
      } else {
        res.send("False");
      }
    }
  );
});
app.post("/signup", (req, res) => {
  let emp = req.body;
  var sql =
    "INSERT INTO users(Name,Gender,Phone,Email,Password) VALUES(?,?,?,?,?)";
  mysqlconnec.query(
    sql,
    [emp.Name, emp.Gender, emp.Phone, emp.Email, emp.Password],
    (err, row, fields) => {
      if (!err) {
        console.log(row);
        console.log("BELLO");
        res.send("Congrats! Sign Up Successful");
      } else {
        console.log(err);

        res.send("Ohho! Error Signing Up");
      }
    }
  );
});

app.get("/reserve", (req, res) => {
  mysqlconnec.query("Select * from reservations", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

app.post("/reserve", (req, res) => {
  let emp = req.body;
  console.log("HELLO Working email2");
  console.log(emp.email);
  var sql =
    "INSERT INTO reservations(noofpeople,reservationname,phone,timereservation,comments,email) VALUES(?,?,?,?,?,?)";
  mysqlconnec.query(
    sql,
    [
      emp.noofpeople,
      emp.reservationname,
      emp.phone,
      emp.timereservation,
      emp.comments,
      emp.email,
    ],
    (err, row, fields) => {
      if (!err) {
        console.log(row);
        console.log("Working");
        res.send("Reservation Successful!");
      } else {
        console.log(err);
        res.send("Ohho! Error Reserving");
      }
    }
  );
});
