const Attempt = require("../models/attempttest");
const Test = require("../models/tests");

const createtest =async(req ,res)=>{
const  { subjects,duration ,testname ,createdBy} =req.body;
const newTest = new Test({
    subjects,
    duration,
    testname,
     createdBy  ,});
    await newTest.save();

res.status(201).json({ message: "Test created successfully", newTest });

};
const getalltests=async(req,res)=>{
    const tests=await Test.find();
    return res.json(tests);

}
const gettestbyid=async(req,res)=>{
const id=req.params.id;
const test = await Test.findById(id);
if (!test) {
    return res.status(404).json({ message: "Test not found" });
}
return res.status(200).json(test);
};
const attemptedtest=async(req,res)=>{
const id=req.user._id;
const attempt=await Attempt.find({user:id}).populate("test");
console.log(attempt);

return res.json(attempt);
};
module.exports=[createtest ,getalltests,gettestbyid ,attemptedtest ];