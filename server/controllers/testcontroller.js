const Test = require("../models/tests");

const createtest =async(req ,res)=>{
const  { subjects,createdBy} =req.body;
const newTest = new Test({
    subjects,
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
module.exports=[createtest ,getalltests,gettestbyid ];