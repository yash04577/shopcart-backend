const { json } = require("express");
const express = require("express");
const app = express();
const routes = require("../router/routes")
const PORT = process.env.PORT || 8000 
const USER = require("../model/userShema")
require("../DB/database")
app.use(json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.listen(PORT, ()=>{

    console.log(`listning at port ${PORT}`);            
})
   

app.use(routes)


app.get("/", (req, res)=>{
    res.send("hello from index homepage")
})

