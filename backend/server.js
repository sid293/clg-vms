// import * as cors from 'cors';
// import db from "./dbconnection";
console.log("server running");
const db = require("./dbconnection");
const cors = require("cors");
const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const qrcode = require('qrcode');
app.use(express.json());
app.use(cors());

// db.run("DROP TABLE users");
// db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT, email TEXT UNIQUE, type TEXT)",(err)=>{if(err){console.error(err)}else{console.log("table created if not exist")}});
// db.run("INSERT INTO users(username, password, email) VALUES ('userone', 'passwordone', 'userone@email.com','Visitor')");
// let user = db.get("SELECT * FROM users WHERE username = ?", "userone", (err, row)=>{
//     if(err){
//         console.error(err);
//     }else{
//         console.log(row);
//     }
// });

let all = db.get("SELECT * FROM users", (err, row)=>{
    if(err){
        console.error(err);
    }else{
        console.log(row);
    }
    return row;
});



// process.on("SIGINT",()=>{
//     db.close((err)=>{
//         if(err){
//             console.error(err);
//         }else{
//             console.log("connection closed");
//         }
//     });
// })

//uncomment
const auth = require("./routes/auth");
const user = require("./routes/users");
const meeting = require("./routes/meeting");
const requests = require("./routes/requests");
const qrs = require("./routes/qrs");

//uncommnet
app.use("/api/v1", auth);
app.use("/api/v1/users", user);
app.use("/api/v1/meeting", meeting);
app.use("/api/v1/requests", requests);
app.use("/api/v1/qrs", qrs);

//uncomment
app.get("/", (req, res) => {
    // res.send("Backend running!");
    res.send(all);
});

//uncomment
app.get('/generate-qr', (req, res) => {
    const data = req.query.data; // Assuming data is sent as a query parameter
    if (!data) {
        return res.status(400).json({ error: 'Missing data parameter' });
    }
    qrcode.toDataURL(data, (err, url) => {
      if (err) {
        return res.status(500).json({ error: 'Error generating QR code' });
      }
  
      res.contentType('image/png'); // Set content type for image
      res.send(url); // Send the base64 encoded QR code image data
    });
  });

const port = 3001;
app.listen(port,()=>{
    console.log("app listening on port "+port);
});

//uncommnet
process.on("SIGINT",()=>{
    db.close((err)=>{
        if(err){
            console.error(err);
        }else{
            console.log("connection closed");
        }
    });
    process.exit();
});
