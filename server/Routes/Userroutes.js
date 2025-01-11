const express =require("express");
const { getuser } = require("../controllers/usercontroller");
const router=express.Router();

router.get("/",getuser);
module.exports=router;