const express = require('express');
const router = express.Router();
const db = require("./../dbconnection");
const jwt = require('jsonwebtoken');
const secretKey = "secretKey";
const fastcsv = require("fast-csv");
// const db = new sqlite3.Database('./database.db',(err)=>{
//     if(err){
//         console.error(err.message);
//     }else{
//         console.log("Connected to database");
//     }
// });

router.post("/login",(req,res)=>{
    console.log("login post request recieved");
    console.log("request body : ",req.body);
    let sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.get(sql, [req.body.username, req.body.password], (err, row)=>{
        if(err){
            console.error(err);
        }else{
            console.log("user is ", row);
            if(row){
                let paylode = {userId:row.id};
                let token = jwt.sign(paylode, secretKey);
                let type =  row.type;
                let user = {
                    id:row.id,
                    username:row.username,
                    email:row.email,
                    type:row.type
                };
                console.log("user logged in successfully"); 
                return res.status(200).json({success:true,type:type,token:token,user:user,message:"user logged in successfully"});
            }else{
                console.log("user not found");
                return res.status(404).json({success:false, message:"user not found"});
            }
        }
    })
})

router.post("/register",(req, res)=>{
    // console.log("register post request recieved");
    // console.log("request body : ", req.body);
    let user = db.get("SELECT * FROM users WHERE username = ?",req.body.username,(err,row)=>{
        if(err){
            console.error(err);
        }else{
            // console.log("user is ",row);
            // console.log("user already exist");
            if(row){
                // console.log("user already exist");
                return res.status(400).json({success:false,message:"username already exist"});
            }else{
                // console.log("user does not exist");
                // insertData();
            }
        }
    });
    db.get("SELECT * FROM users WHERE email = ?",req.body.email,(err,row)=>{
        if(err){
            console.error(err);
        }else{
            // console.log("user is ", row);
            // console.log("user already exist");
            if(row){
                console.log("email already exist");
                return res.status(400).json({success:false, message:"email already exist"});
            }else{
                // console.log("user does not exist");
                insertData();
            }
        }
    });
    // console.log("user is ", user.row);
    let insertData = ()=>{
        console.log("insertign data");
        let sql = "INSERT INTO users (username, password, email, type) VALUES (?, ?,?,?)";
        db.run(sql, [req.body.username, req.body.password, req.body.email, req.body.type], (err)=>{
            if(err){
                console.error(err);
            }else{
                console.log("user registered successfully");
                return res.status(201).send("User registered successfully");
            }
        })
    };
    
})

router.get("/data",(req,res)=>{
    // let sql4 = "CREATE TABLE requests (id INTEGER PRIMARY KEY AUTOINCREMENT, sender TEXT NOT NULL, reciever TEXT NOT NULL, status TEXT NOT NULL)";
    // let sql5 = "INSERT INTO requests (sender, reciever, status) VALUES (?, ?, ?)";
    // db.run(sql4);
    // db.run(sql5, ["userone", "userthree", "pending"]);

    // let sql6 = "CREATE TABLE qrs (id INTEGER PRIMARY KEY AUTOINCREMENT, sender TEXT NOT NULL, data TEXT NOT NULL, reciever TEXT NOT NULL, status TEXT NOT NULL);";
    // let sql7 = "INSERT INTO qrs (sender, data , reciever, status) VALUES (?, ?, ?,?);";
    // db.run(sql6);// qr data storing?       
    // let sql6 = "ALTER TABLE qrs ADD time DATETIME";
    // let sql7 = "ALTER TABLE qrs ADD timeout DATETIME";
    // db.run(sql6);
    // db.run(sql7);
    // db.run(sql7, ["sender78","hellow boid", "reciever76", "activated"]);

    // let sql8 = "CREATE TABLE meetings (id INTEGER PRIMARY KEY AUTOINCREMENT, employee TEXT NOT NULL, visitor TEXT NOT NULL, time DATETIME NOT NULL, reason TEXT);";
    // let sql9 = "INSERT INTO meetings (employee, visitor, time, reason) VALUES (?, ?, ?, ?);";
    // let now = new Date();
    // db.run(sql8);
    // db.run(sql9, ["employee", "visitor", now, "casually"]);
    
    //adding raw data in database
    // let sql1 = "INSERT INTO users (username, password, email, type) VALUES (?, ?, ?, ?)";
    // db.run(sql1, ["receptionone", "receptionone", "receptionone@gmail.com", "Reception"]);
    // let sql6 = "ALTER TABLE users ADD status VARCHAR DEFAULT 'out';";
    // db.run(sql6);


    //removing data from database
    // let sql2 = "DELETE FROM requests WHERE 1;";
    // db.run(sql2);

    // let sql2 = "DROP TABLE IF EXISTS meetings;";
    // db.run(sql2);
    // console.log("request queyr ",req.body);

    //enter new admin user with some details in users table
    // let sql3 = "INSERT INTO users (username, password, email, type) VALUES (?, ?, ?, ?)";
    // db.run(sql3, ["admin", "admin", "admin@gmail.com", "Admin"]);

    let sql = "SELECT * FROM users";
    db.all(sql,(err,rows)=>{
        if(err){
            console.error(err);
        }else{
            if(rows.length > 0){
                res.json(rows);
                console.log("data is ", rows);
            }
        }
    })

})

module.exports = router;

