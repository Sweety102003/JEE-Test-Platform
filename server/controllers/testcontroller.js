const Test = require("../models/tests");

const createtest =async(req ,res)=>{
const  { subject ,questions ,createdBy} =req.body;
const newTest = new Test({
    subject,
    questions,
    createdBy,  });
    await newTest.save();

res.status(201).json({ message: "Test created successfully", newTest });

};
module.exports={createtest};