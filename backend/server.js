const dotenv= require("dotenv").config();
const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const pinRoute=require("./routes/pins");
const userRoute=require("./routes/users");
const app=express();
app.use(express.json());
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true},(err)=>
{
    if(err)
    {
        console.log("server shutting down...!!");
    }
    else 
    {
        console.log("Hurray,database is connected")
    }
});
//accessing routes
app.use("/api/user",userRoute);
app.use("/api/pins",pinRoute);
app.get("/",(req,res)=>
{
    res.send("Server Has Been Started")
})
app.listen(8800,()=>
{
    console.log("hurray,server started");

})