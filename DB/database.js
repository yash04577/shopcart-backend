const mongoose = require("mongoose") 

// const connectionString = `mongodb+srv://yash04577:4577@cluster0.6yy3twg.mongodb.net/?retryWrites=true&w=majority`
const connectionString = "mongodb+srv://yash04577:4577@cluster0.ifbqqph.mongodb.net/?retryWrites=true&w=majority"
mongoose.set("strictQuery", false);

mongoose.connect(connectionString)

.then(()=>{
    console.log("connection sucessfull")
})
.catch((err)=>{console.log("no connection " + err);})