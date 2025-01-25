const mongoose=require("mongoose");
const attemptSchema=new mongoose.Schema({

        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        test: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
        answers: [{ questionId: mongoose.Schema.Types.ObjectId, answer: String,
          timeTaken: Number,
          correct: Boolean
         }],
        score: { type: Number, default: 0 },
        testDuration:{type: Number,default:0},
        completedAt: { type: Date, default: Date.now },
      });
      const Attempt = mongoose.model("Attempt", attemptSchema);
      module.exports=Attempt;
      
      

