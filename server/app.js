const express=require("express");
const app=express();

const cors =require("cors");
const mongoose =require("mongoose");
require("dotenv").config();
const Mongo_url=process.env.Mongo_url;
const PORT=process.env.PORT ;
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
