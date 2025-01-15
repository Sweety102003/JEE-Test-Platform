const express=require("express");
const app=express();
const PORT=5000;
const cors =require("cors");
const mongoose =require("mongoose");
const Mongo_url=require("./keys");
const userroutes=require("./Routes/Userroutes");
const testroutes=require("./Routes/Testroutes");
app.use(express.json());
app.use(cors());
app.use("/", userroutes);
app.use("/" ,testroutes);
mongoose.connect(Mongo_url);
mongoose.connection.on("connected",()=>{
console.log("successfully connected to mongo");
});
app.listen(PORT ,()=>{
console.log(`SERVER IS LISTENING ON ${PORT} `);
});
