const express = require('express');
const router = express.Router();
const db = require("./../dbconnection");

router.post('/update',(req,res)=>{
    console.log("update request recieved");
    let sql = "UPDATE `requests` SET `status`=? WHERE `id`=?";
    let values = [req.body.status, req.body.id];
    db.run(sql, values, (err, result)=>{
        if(err) throw err;
        res.status(200).json({success:true,message:"updated status"});
    })
})



module.exports = router;
