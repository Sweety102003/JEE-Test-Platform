const mongoose=require("mongoose");
const USER = require("./user");
const Test = require("./tests");
const attemptSchema=new mongoose.Schema({

        user: { type: mongoose.Schema.Types.ObjectId, ref: USER, required: true },
        test: { type: mongoose.Schema.Types.ObjectId, ref: Test, required: true },
        answers: [{ questionId: mongoose.Schema.Types.ObjectId, answer: String,
          timeTaken: Number,
          correct: Boolean
         }],
        score: { type: Number, default: 0 },
        testDuration:{type: Number,default:0},
        completedAt: { type: Date, default: Date.now },
        subjectScores: [
          {
            subjectName: { type: String, required: true },
            score: { type: Number, default: 0 },
            totalQuestions: { type: Number, default: 0 },
          },
        ],
        performanceData: [
          {
            questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
            timeTaken: { type: Number, default: 0 }, 
            correct: { type: Boolean, default: false },
          },
        ],
      });
      const Attempt = mongoose.model("Attempt", attemptSchema);
      module.exports=Attempt;
      
      

