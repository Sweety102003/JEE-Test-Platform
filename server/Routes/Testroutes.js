const express =require("express");
const [ createtest ,getalltests,gettestbyid ] = require("../controllers/testcontroller");
const router=express.Router();
router.post("/create" ,createtest);
router.get("/tests" , getalltests);
router.get("/test/:id" ,gettestbyid);
module.exports=router;
