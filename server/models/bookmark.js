const mongoose=require("mongoose");
const USER = require("./user");
const bookmarkschema=new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:USER
},
questionId:{
    type:String,
    req:true

},
status:{
type:String,
req:true
},
bookmarked:{
    type:Boolean,
    default:false

}
});
const Bookmark=mongoose.model("Bookmark",bookmarkschema);
module.exports=Bookmark;

