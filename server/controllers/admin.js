const Attempt = require("../models/attempttest");
const Test = require("../models/tests");
const USER = require("../models/user");

const getadmintests=async(req,res)=>{
const id =req.user._id;
const tests =await Test.find({createdBy:id});
return res.status(200).json(tests);

};
const howmanyattempted=async(req,res)=>{
const {id}=req.body;
    const tests=await Attempt.find({test:id}).populate("user");
    return res.status(200).json(tests);
}
const getleaderboard=async(req,res)=>{
 const users=await Attempt.find().sort({score:-1}).limit(10).populate("user");
 return res.status(200).json(users);

}
module.exports=[getadmintests,howmanyattempted ,getleaderboard];
