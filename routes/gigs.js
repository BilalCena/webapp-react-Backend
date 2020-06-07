const express = require('express'); 
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res) => 
Gig.findAll()
.then(gigs => {
    console.log('GIGS IS WORKING')
    console.log(gigs) 
    res.send(gigs)   
    
}) 
.catch(err => console.log(err)));
/*
router.get('/show', (req,res) => {
    const {term} = req.query;
    Gig.findAll({ where: { try2: { [Op.like]: '%' + term + '%'}}})
    .then(gigs => res.send(gigs) )
    .catch(err => console.log(err));
})
*/

/*router.get('/add', (req, res) => {
    const data = {
        
        try2: 30
    }

    let {try1, try2} = data;

    Gig.create({
        
        try2
    })
    .then()
    .catch( err => console.log("ABAY     ERROR", err));

}); */




/*const mysql = require("mysql");
const app = express();
const cors = require("cors");
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
  app.listen(9005, () => console.log("Express is running"));



  
app.post('/gigs/add', (req, res) => {
    let emp = req.body;
    console.log("RESTADD Working");
    console.log(emp.RestName);
    var sql =
      "INSERT INTO restaurants(RestName, Cuisine, Location, Rating) VALUES(?,?,?,?)";
    mysqlconnec.query(
      sql,
      [
        emp.RestName,
        emp.Cuisine,
        emp.Location,
        emp.Rating
      ],
      (err, row, fields) => {
        if (!err) {
          console.log(row);
          console.log("Working");
          res.send("Restaurant Added!");
        } else {
          console.log(err);
          res.send("Ohho! Error Adding Restaurant");
        }
      }
    );
});
/*
app.post('/show', (req, res) => {
    let emp = req.body;
    console.log("BATTAAA CHAL GAYA?");
   
   mysqlConnection.query("SELECT * FROM webapp.trytables WHERE try1 =?",[emp.try1], (err, rows, fields) => {
       console.log("CHAL GAYA?")
    if (rows.length>0){
        res.send(rows)
        console.log("Chal work")}
        
        else{
        res.send("No blood type found")
        console.log("CHAL not work")}
    })
    

}) */
/*


module.exports = router;*/