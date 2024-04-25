const express = require('express');
const router = express.Router();
const db = require("./../dbconnection");

router.post("/add",(req,res)=>{
    console.log("qrs request to add");
    //todo: recieve and add data to qrs table
    // console.log(req.body);
    let sql = "INSERT INTO qrs (sender, reciever, data, status, time, timeout) VALUES (?,?,?,?,?,?)";
    db.run(sql, [req.body.receiver, req.body.sender, req.body.qrdata, req.body.status, req.body.time, req.body.timeout], (err) => {
        if (err) {
            console.error(err);
        } else {
            // console.log("qrs added");
            console.log("time and timeout are ",req.body.time,req.body.timeout);
            res.status(200).json({success:true,message:"qrs added"});
        }
    })
})

router.post("/validate",(req,res)=>{
    console.log("qrs request to validate");
    //todo: get the user who has the qr
    // console.log(req.body);
    let sql = "SELECT * FROM qrs WHERE data = ?";
    // console.log("request body text ",req.body.text);
    db.all(sql, [req.body.text], (err,result) => {
        if (err) {
            console.error(err);
        } else {
            // console.log("qrs added");
            // res.status(200).json({success:true,message:"qrs added"});
            console.log(result);
            if(result.length < 1){
                // console.log("qrs not found");
                res.status(200).json({success:true, result:false});
            }else if(result.length == 1){
                // console.log("qrs found");
                res.status(200).json({success:true, result:result});
            }else if(result.length > 1){
                // console.log("multiple qrs found");
                res.status(200).json({success:true, result:"multiple"});
            }else{
                console.log("no options working for qr backend.");
            }

        }
    })
})

router.post('/getqr',(req,res)=>{
    console.log("getqrs request recieved between ",req.body.sender, req.body.receiver);
    let sql = "SELECT * FROM `qrs` WHERE `sender`=? AND `reciever`=?";
    db.all(sql, [req.body.sender, req.body.receiver], (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
            res.status(200).json({success:true, result:result});
        }
    })
})

router.get("/checkedin",(req,res)=>{
    let sql = "SELECT * FROM qrs WHERE status = ?";
    db.all(sql, ["In"], (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
            res.status(200).json({success:true, result:result});
        }
    })
})




module.exports = router;
