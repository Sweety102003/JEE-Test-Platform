const express =require("express");
const [ createtest ,getalltests,gettestbyid ,attemptedtest ,createbookmark ,getbookmarkedques ,getupcomingtests ] = require("../controllers/testcontroller");
const [calculateresult,getresult] = require("../controllers/resultcalculation");
const requirelogin = require("../middleware/requirelogin");
const router=express.Router();
router.post("/create" ,requirelogin ,createtest);
router.get("/tests" , getalltests);
router.get("/test/:id" ,gettestbyid);
router.post("/submittest" ,calculateresult);
router.get("/results/:id" ,requirelogin,getresult);
router.get("/attemptedtests",requirelogin ,attemptedtest);
router.post("/bookmark" ,requirelogin ,createbookmark);
router.get("/bookmarks",requirelogin ,getbookmarkedques);
router.get("/upcomingtests" , getupcomingtests);
module.exports=router;
