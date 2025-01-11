const mongoose =require("mongoose");
const userSchema=new mongoose.Schema({
name:{
    type:String ,
    req:true
},
email:{
    type:String,
    req:true
},
password:{
    type:String,
    req:true
},
isAdmin:{
    type:Boolean,
    default:false
}

});
const USER=mongoose.model("USER",userSchema);
module.exports=USER;