const express = require('express');
const router = express.Router();
const db = require("./../dbconnection");
const jwt = require('jsonwebtoken');
const secretKey = "secretKey";

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
    let user = db.get("SELECT * FROM users WHERE username = ?",req.body.username,(err,row)=>{
        if(err){
            console.error(err);
        }else{
            if(row){
                return res.status(400).json({success:false,message:"username already exist"});
            }else{
                // insertData();
            }
        }
    });
    db.get("SELECT * FROM users WHERE email = ?",req.body.email,(err,row)=>{
        if(err){
            console.error(err);
        }else{
            if(row){
                console.log("email already exist");
                return res.status(400).json({success:false, message:"email already exist"});
            }else{
                insertData();
            }
        }
    });
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

//helper route for debugging
router.get("/data",(req,res)=>{
    let sql = "SELECT * FROM requests";
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

