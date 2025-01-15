const express =require("express");
const [registeruser ,getuser ] = require("../controllers/usercontroller");
const router=express.Router();

router.post("/register",registeruser);
router.post("/login" ,getuser);

module.exports=router;