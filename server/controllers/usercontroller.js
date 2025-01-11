const USER = require("../models/user");

const getuser=async(req, res)=>{
const id=req.params.id;
const user =await USER.findById(id);
if(!user)
{
    return res.status(404).json({message:"user not found"});
}
return res.json(user);
}
module.exports={getuser};