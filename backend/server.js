const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const port = 3001;
app.listen(port,()=>{
    console.log("app listening on port "+port);
});