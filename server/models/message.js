const mongoose =require("mongoose");
const messsagemodel= new mongoose.Schema({
name:{
    type:String,
    req:true
},
email:{
    type:String,
    req:true
},
subject:{
    type:String,
    req:true
},
message:{
    type:String,
    req:true
}
});
const Message=mongoose.model("Message" ,messsagemodel);
module.exports=Message;
