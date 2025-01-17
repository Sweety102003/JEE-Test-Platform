const Attempt = require("../models/attempttest");
const Test = require("../models/tests");

const calculateresult=async(req,res)=>{
const {userid ,testid ,answers}=req.body;
const test=Test.findById(testid);
if(!test)
{
    return res.status(404).json({messsage:"test not found"});
}
for(answer of answers)
{
    const question = test.questions.find(q => q._id.equals(answer.questionId));
    if (question && question.correctAnswer === answer.answer) {
      score++;
    }
}
const attempt=new Attempt({
    user:userid,
    test:testid,
    answers,
    score
})
 await attempt.save();
return res.status(200).json({ message: "Result calculated", score });



};
module.exports=calculateresult;
