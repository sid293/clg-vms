const express = require('express');
const router = express.Router();
const db = require("./../dbconnection");



router.post('/form',(req,res)=>{     //SHOULD HAVE PUT THIS IN REQUESTS
    // get reciever, reason, email, time fromm req. and put it in database meetings
    let time = req.body.time;
    let reciever = req.body.name;
    let email = req.body.email;
    let sender = req.body.sender;
    let reason = req.body.reason;
    let timeout = req.body.timeout;

    let addRequestInDb = ()=>{
        console.log("user present: request sent");
        let sql = "INSERT INTO requests (sender, reciever, status, reason, time, email, timeout) VALUES (?,?,?,?,?,?,?)";
        db.run(sql,[sender, reciever, "pending",reason, time, email, timeout],(err, response)=>{
            if(err){
                console.error(err);
                res.status(200).json({success: false, data: "failed to add data"});

                // return false;
            }else{
                console.log("request sent");
                // return true;
                res.status(200).json({success: true, data: "request sent"});
            }
        })
    };
    //todo: checking if user exist
    let sql = "SELECT * FROM users where username = ?";
    console.log("checking for reciever ", reciever);
    db.all(sql,[reciever],(err,resdb)=>{
        if(err){
            console.error(err);
        }else{
            console.log("user is ", resdb);
            if(resdb.length < 1){
                console.log("user does not exist");
                res.status(200).json({success: false, data: "user does not exist"});
            }else{
                //todo: send the request to user
                addRequestInDb();
                // console.log("addData is ", addedData);
                // if(addedData){
                //     res.status(200).json({success: true, data: "request sent"});
                // }else{
                //     res.status(200).json({success: false, data: "failed to add data"});
                // }
            }
        }
    })
})

router.post('/add',(req,res)=>{
    console.log("adding meeting");
    console.log("meeting is ", req.body);
    let sql = "INSERT INTO meetings (employee, visitor, time, reason) VALUES (?, ?, ?, ?)";
    db.run(sql,[req.body.employee, req.body.visitor, req.body.time, req.body.reason],(err, response)=>{
        if(err){
            console.error(err);
        }else{
            console.log("meeting added");
            res.status(200).json({success:true,message:"meeting added"});
        }
    })
})

module.exports = router;