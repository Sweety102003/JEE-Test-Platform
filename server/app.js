const express=require("express");
const app=express();
const PORT=5000;
const cors =require("cors");
const mongoose =require("mongoose");
const Mongo_url=require("./keys");
app.use(express.json());
app.use(cors());

mongoose.connect(Mongo_url);
mongoose.connection.on("connected",()=>{
console.log("successfully connected to mongo");
});
app.listen(PORT ,()=>{
console.log(`SERVER IS LISTENING ON ${PORT} `);
});
