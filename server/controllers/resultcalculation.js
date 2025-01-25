const Attempt = require("../models/attempttest");
const Test = require("../models/tests");
const mongoose=require("mongoose");
const jwt = require('jsonwebtoken');
const calculateresult=async(req,res)=>{
    try{
const {userid ,testid ,answers}=req.body;
const decodedToken = jwt.decode(userid); 
        if (!decodedToken || !decodedToken._id) {
            return res.status(400).json({ message: "Invalid token" });
        }
        
const test= await Test.findById(testid).populate("subjects");
console.log(test);
console.log(userid);
if(!test)
{
    return res.status(404).json({message:"test not found"});
}
let score=0;
let subjectScores = {};
let totalTime = 0;
const performanceData = [];

for (let answer of answers) {
    const question = test.subjects
        .flatMap(subject => subject.questions)
        .find(q => q._id.equals(new mongoose.Types.ObjectId(answer.questionId)));

    if (question) {
        const timeTaken = Number(answer.timeTaken) || 0;
        totalTime += timeTaken;

        // Use the subject name instead of subject._id to track subject scores
        const subjectName = test.subjects
            .find(subject => subject.questions.some(q => q._id.equals(question._id)))
            .subjectname;

        if (!subjectScores[subjectName]) {
            subjectScores[subjectName] = { score: 0, totalQuestions: 0 };
        }

        // If the question exists and the answer is correct, increment the score
        if (question.correctAnswer === answer.answer) {
            score++;
            subjectScores[subjectName].score;
        }
        subjectScores[subjectName].totalQuestions++;

        performanceData.push({
            questionId: question._id,
            timeTaken,
            correct: question.correctAnswer === answer.answer
        });
    }
}

score=score*4;
const attempt=new Attempt({
    user:decodedToken._id,
    test:testid,
    answers,
    score:score,
    testDuration: totalTime ||0,
})
 await attempt.save();
return res.status(200).json({ message: "Result calculated", score,
    subjectScores,
    performanceData,
    testDuration: totalTime
 });
}
catch (error) {
    console.error("Error calculating results:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

};
const getresult=async(req,res)=>{
const id=req.params.id;
const userid=req.user._id;
const attempt =await Attempt.findOne({
    user:userid,
    test:id
}


);

res.status(200).json(attempt);


};
module.exports=[calculateresult,getresult];
