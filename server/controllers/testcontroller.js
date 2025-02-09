const Attempt = require("../models/attempttest");
const Bookmark = require("../models/bookmark");
const Test = require("../models/tests");

const createtest =async(req ,res)=>{
const  { subjects,duration,date ,testname } =req.body;

const newTest = new Test({
    subjects,
    duration,
    date,
    testname,
     createdBy:req.user._id,
    });
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
const createbookmark=async(req,res)=>{
const {questionId,bookmarked}=req.body;
const bookmark=new Bookmark({
    user:req.user._id,
    questionId,
    bookmarked
})
console.log(bookmark);
await bookmark.save();
res.status(200).json(bookmark);
};
const getbookmarkedques=async(req,res)=>{


const bookmarks=await Bookmark.find({user:req.user._id,
    bookmarked:true
});
const bookmarkedQuestionIds = bookmarks.map((bookmark) => bookmark.questionId);
const tests=await Test.find();
let bookmarkedQuestions = [];

        
        tests.forEach((test) => {
            test.subjects.forEach((subject) => {
                subject.questions.forEach((question) => {
                    if (bookmarkedQuestionIds.includes(question._id.toString())) {
                        bookmarkedQuestions.push({
                            questionText: question.questionText,
                            questionImage: question.questionImage,
                            options: question.options,
                            correctAnswer: question.correctAnswer,
                        });
                    }
                });
            });
        });
console.log("me");
        res.status(200).json({ bookmarkedQuestions });
};
const getupcomingtests=async(req,res)=>{
const today =new Date();
const tests=await Test.find({date:{$gte:today}}).sort({date:1});
 return res.json( tests);


};

module.exports=[createtest ,getalltests,gettestbyid ,attemptedtest ,createbookmark ,getbookmarkedques ,getupcomingtests ];