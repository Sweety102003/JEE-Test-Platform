const express =require("express");
const { createtest } = require("../controllers/testcontroller");
const router=express.Router();
router.post("/create" ,createtest);
module.exports=router;
