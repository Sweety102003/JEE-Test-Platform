const express =require("express");
const [registeruser ,getuser ,userinfo ,getmessage] = require("../controllers/usercontroller");
const requirelogin = require("../middleware/requirelogin");
const router=express.Router();

router.post("/register",registeruser);
router.post("/login" ,getuser);
router.get("/profile",requirelogin,userinfo);
router.post("/contact" ,getmessage);

module.exports=router;