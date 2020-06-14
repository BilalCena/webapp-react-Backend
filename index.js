const mysql = require("mysql");
const cors = require("cors");
const express = require("express");
const app = express();
const bodypar = require("body-parser");
const jwt=require("jsonwebtoken");

const exphbs = require("express-handlebars");
const path = require("path");



//HANDLEBARS
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

/*app.engine('handlebars', exphbs({defaultLayout: 'main'}));*/

/*ALL ABOVE IS FOR SEARCH PAGE*/

app.use(cors());
app.use(bodypar.json());
var mysqlconnec = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "admin",
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
    "Select * from userss where Email =? and Password = ?",
    [a.Email, a.Password],
    (err, row, field) => {
      if (row.length > 0) {
        if(row[0].usertypeid==1){
        console.log(row)
          const user={
            id:row[0].userid,
            name:row[0].Name,
            email:a.Email,
            typeid:row[0].usertypeid
          }
          jwt.sign({user},'secretkey',(err,token)=>
          {
            var type="customer"
            console.log(token)
            
res.json({token,type});
          })
      
      
      }
     else if(row[0].usertypeid==2){
        console.log(row)
          const user={
            id:row[0].userid,
            name:row[0].Name,
            email:a.Email,
            typeid:row[0].usertypeid,
            restname:row[0].restadmin
          }
          jwt.sign({user},'adminkey',(err,token)=>
          {
            var type="Admin"
res.json({token,type});
          })
      
      }
      else if(row[0].usertypeid==3){
        console.log(row)
          const user={
            id:row[0].userid,
            name:row[0].Name,
            email:a.Email,
            typeid:row[0].usertypeid,
            restname:row[0].restadmin
          }
          jwt.sign({user},'superadminkey',(err,token)=>
          {
            var type="Super_Admin"
res.json({token,type});
          })
      
      }        
    } else {
        res.send("False");
      }
    }
  );
});
app.post("/signup", (req, res) => {
  let emp = req.body;
  var sql =
    "INSERT INTO userss(Email,Password,Name,Gender,Phone,usertypeid) VALUES(?,?,?,?,?,?)";
  mysqlconnec.query(
    sql,
    [emp.Email, emp.Password, emp.Name, emp.Gender, emp.Phone,emp.usertype],
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
app.post("/add", (req, res) => {
  let emp = req.body;
  var sql =
    "INSERT INTO restaurants(RestName,Cuisine,Location,Rating) VALUES(?,?,?,?)";
  mysqlconnec.query(
    sql,
    [emp.RestName, emp.Cuisine, emp.Location, emp.Rating],
    (err, row, fields) => {
      if (!err) {
        console.log(row);
        console.log("BELLO");
        res.send("Congrats! Restaurant added");
      } else {
        console.log(err);

        res.send("Ohho! Error Signing Up");
      }
    }
  );
});

app.get("/reserve/", (req, res) => {
  mysqlconnec.query("Select * from reservations", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});
app.get("/getrestraunt", (req, res) => {
  mysqlconnec.query("Select * from restaurants", (err, rows, fields) => {
    if (!err){
      console.log('Hello')
      res.send(rows)
    }
    else console.log(err);
  });
});

app.post("/reserve",verifyToken ,(req, res) => {
  jwt.verify(req.token,'secretkey',(err,authData)=>{
    if(err){
        res.sendStatus(403);

    } else{
  let emp = req.body;
  console.log("HELLO Working email2");
  console.log(emp.email);
  var sql =
    "INSERT INTO reservations(noofpeople,reservationname,phone,timereservation,comments,email,restName,userid) VALUES(?,?,?,?,?,?,?,?)";
  mysqlconnec.query(
    sql,
    [
      emp.noofpeople,
      emp.reservationname,
      emp.phone,
      emp.timereservation,
      emp.comments,
      emp.email,
      emp.restname,
      authData.user.id
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
  );}
})});
app.get("/mybookings",verifyToken ,(req, res) => {
  jwt.verify(req.token,'secretkey',(err,authData)=>{
    if(err){
        res.sendStatus(403);

    } else{

  console.log("HELLO Working email2");
  
  var sql =
    "SELECT * FROM reservations where userid=?"
  mysqlconnec.query(
    sql,
    [
     authData.user.id
    ],
    (err, row, fields) => {
      if (!err) {
        console.log(row);
        console.log("Working");
        res.send(row);
      } else {
        console.log(err);
        res.send("Ohho! Error Reserving");
      }
    }
  );}
})});

app.post("/hakun", (req, res) => {
  let emp = req.body;
  console.log("HELLO Working email2");
  console.log(emp.RestName);

  mysqlconnec.query(
    "SELECT * FROM restaurants WHERE RestName LIKE ?",
    [emp.RestName],
    (err, rows, fields) => {
      if (!err) {
        console.log("Working");
        console.log(rows)
        res.send(rows);
        
      } else {
        console.log(err);
        res.send("No ID found");
      }
    }
  );
});
app.get("/getrestrauntss",verifyToken ,(req, res) => {
  
  
jwt.verify(req.token,'adminkey',(err,authData)=>{
if(err){
  res.send('error')
} else{
console.log('hello')
  mysqlconnec.query(
    "SELECT * FROM reservations WHERE restName =? AND statuss=?;",
    [authData.user.restname,"Pending"],
    (err, rows, fields) => {
      if (rows.length > 0) {
        
        res.send(rows);
        
      } else {
        console.log(err);
        res.send("No ID found");
      }
    }
  );
}})});

app.get("/admingetrestrauntss",verifyToken ,(req, res) => {
  
  
  jwt.verify(req.token,'superadminkey',(err,authData)=>{
  if(err){
    res.send('error')
  } else{
  console.log('hello')
    mysqlconnec.query(
      "SELECT * FROM reservations;",
      [authData.user.restname,"Pending"],
      (err, rows, fields) => {
        if (rows.length > 0) {
          
          res.send(rows);
          
        } else {
          console.log(err);
          res.send("No ID found");
        }
      }
    );
  }})});
app.get("/adminrestrauntss",verifyToken ,(req, res) => {
  
  
  jwt.verify(req.token,'adminkey',(err,authData)=>{
  if(err){
    res.send('error')
  } else{
  console.log('hello')
    mysqlconnec.query(
      "SELECT * FROM reservations",
      [authData.user.restname,"Pending"],
      (err, rows, fields) => {
        if (rows.length > 0) {
          
          res.send(rows);
          
        } else {
          console.log(err);
          res.send("No ID found");
        }
      }
    );
  }})});
app.put('/Acceptreservation', (req, res) => {
  let emp = req.body;
  console.log("RESTADD Working");
  console.log(emp.reservationid);
  var sql =
    "UPDATE reservations set statuss=? where reservationid=? ";
  mysqlconnec.query(
    sql,
    [
      "Accept",
      emp.id
    ],
    (err, row, fields) => {
      if (!err) {
        console.log(row);
        console.log("Working");
        res.send("Reservation updated!");
      } else {
        console.log(err);
        res.send("Ohho! Error Reservation ");
      }
    }
  );
});
app.put('/Declinereservation', (req, res) => {
  let emp = req.body;
  console.log("RESTADD Working");
  console.log(emp.reservationid);
  var sql =
    "UPDATE reservations set statuss=? where reservationid=? ";
  mysqlconnec.query(
    sql,
    [
      "Rejected",
      emp.id
    ],
    (err, row, fields) => {
      if (!err) {
        console.log(row);
        console.log("Working");
        res.send("Reservation updated!");
      } else {
        console.log(err);
        res.send("Ohho! Error Reservation ");
      }
    }
  );
});

function verifyToken(req,res,next){
  const header=req.headers['authorization'];
  if(typeof header!== 'undefined'){
    req.token=header;
    next();
  } 
  else{
    res.send("Forbidden")
  }

}
