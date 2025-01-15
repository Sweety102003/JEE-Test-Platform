const mongoose=require("mongoose");
const USER = require("./user");
const questionSchema =new mongoose.Schema({
questionText:{
    type:String ,
    req:true
},
options:
    [{
        type:String,
        req:true}

    ],
    correctAnswer:{
        type:Number,
        req:true
    }



});
const testSchema=new mongoose.Schema({
    subject: { type: String, required: true },
        questions: [questionSchema],  
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: USER, required: true },
        createdAt: { type: Date, default: Date.now },  
    },
    { timestamps: true }
);
const Test = mongoose.model("Test", testSchema);
module.exports=Test;
