const express = require('express');
const router = express.Router();
const db = require("./../dbconnection");

router.get('/inboxworking', (req, res) => {
    let sql = "SELECT * FROM meetings";
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
});

router.post('/inbox', (req, res) => {
    // console.log("inbox request recieved");
    let user = req.body.user;
    let userType = req.body.type;
    // console.log("inbox user ", user);
    //employee == reciever | visitor == sender
    let sql = "";
    if(userType == "Visitor"){
        sql = "SELECT * FROM requests WHERE sender = ?";
        console.log("inbox of visitor ");
        // user = user.username;
    }else if(userType == "Employee"){
        sql = "SELECT * FROM requests WHERE reciever = ?";
        console.log("inbox of employee ");
    }
    // let sql = "SELECT * FROM requests WHERE reciever = ?";
    console.log("user is ",user);
    db.all(sql, [user], (err, result) => {
        if (err) throw err;
        if(result){
            console.log("inbox response ", result);
            res.status(200).json({ success: true, data: result });
        }else{
            res.status(200).json({ success: false, data: result });
        }
    })
});

router.post("/getuser",(req,res)=>{
    let user = req.body.user;
    let sql = "SELECT * FROM users WHERE username = ?";
    db.all(sql, [user], (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
            res.status(200).json({success:true, result:result});
        }
    })
})

router.post("/switchstatus",(req,res)=>{
    let user = req.body.user;
    let qrdata = req.body.qrdata;
    //GET CURRENT STATUS OF USER
    let sql = "SELECT * FROM users WHERE username = ?";
    db.all(sql, [user], (err, result) => {
        if (err) {
            console.error(err);
        } else {
            let status = result[0].status;
            let newStatus = "";
            if(status == "In"){
                newStatus = "Out";
            }else{
                newStatus = "In";
            }
            //UPDATE STATUS OF USER
            let sql2 = "UPDATE qrs SET status = ? WHERE data = ?";
            db.run(sql2, [newStatus, qrdata], (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(result);
                    // res.status(200).json({success:true, result:result,newStatus:newStatus});
                }
            })
            let sql = "UPDATE users SET status = ? WHERE username = ?";
            db.run(sql, [newStatus, user], (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(result);
                    res.status(200).json({success:true, result:result,newStatus:newStatus});
                }
            })
        }
    })
})

router.get("/employees",(req,res)=>{
    let sql = "SELECT * FROM users WHERE type = ?";
    db.all(sql, ["Employee"], (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
            res.status(200).json({success:true, result:result});
        }
    })
})

router.post("/removeuser",(req,res)=>{
    let user = req.body.user;
    let sql = "DELETE FROM users WHERE username = ?";
    db.run(sql, [user], (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
            res.status(200).json({success:true, result:result});
        }
    })
})

module.exports = router;
