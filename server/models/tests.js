const mongoose=require("mongoose");
const USER = require("./user");
const questionSchema =new mongoose.Schema({
questionText:{
    type:String ,
    req:true
},
questionImage:{
    type:String,
    req:false
},
options:
    [{ optionText:{
        type:String,
        req:true},
        optionImage:{
            type :String ,
            req:false
        }
    }

    ],
    correctAnswer:{
        type:Number,
        req:true
    }



});
const subjectschema=new mongoose.Schema({
   subjectname:{
    type:String,
    req:true
   } ,
   questions:[questionSchema]
})
const testSchema=new mongoose.Schema({
    subjects: [subjectschema],
    duration:{type:String,req:true},
    testname:{type:String ,req:true},
    date: { type: Date, req: true }, 
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: USER, req: true },
        createdAt: { type: Date, default: Date.now },  
    },
    { timestamps: true }
);
const Test = mongoose.model("Test", testSchema);
module.exports=Test;
