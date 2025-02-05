const Attempt = require("../models/attempttest");
const Test = require("../models/tests");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const calculateresult = async (req, res) => {
  try {
    const { userid, testid, answers, timeTaken } = req.body;
    const decodedToken = jwt.decode(userid);

    if (!decodedToken || !decodedToken._id) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const test = await Test.findById(testid).populate("subjects");
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    let score = 0;
    let subjectScores = [];
    let totalTimes = 0;
    const performanceData = [];

    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];
      const question = test.subjects
        .flatMap((subject) => subject.questions)
        .find((q) => q._id.equals(new mongoose.Types.ObjectId(answer.questionId)));

      if (question) {
        const timeTakenForQuestionSec = Math.floor((timeTaken[i]?.timeSpent || 0) / 1000);
        totalTimes += timeTakenForQuestionSec;

        const subjectName = test.subjects
          .find((subject) => subject.questions.some((q) => q._id.equals(question._id)))
          .subjectname;

        let subjectEntry = subjectScores.find((sub) => sub.subjectName === subjectName);
        if (!subjectEntry) {
          subjectEntry = { subjectName, score: 0, totalQuestions: 0 };
          subjectScores.push(subjectEntry);
        }

        subjectEntry.totalQuestions++;
        const isCorrect = question.correctAnswer === answer.answer;
        if (isCorrect) {
          score += 4;
          subjectEntry.score += 4;
        }

        performanceData.push({
          questionId: question._id,
          timeTaken: timeTakenForQuestionSec,
          correct: isCorrect,
        });
      }
    }

    
    const updatedAttempt = await Attempt.findOneAndUpdate(
      { user: req.user._id, test: testid },
      {
        user: req.user._id,
        test: testid,
        answers: answers.map((ans, index) => ({
          questionId: ans.questionId,
          answer: ans.answer,
          timeTaken: Math.floor((timeTaken[index]?.timeSpent || 0) / 1000),
          correct: performanceData[index]?.correct || false,
        })),
        score,
        testDuration: totalTimes,
        subjectScores,
        performanceData,
      },
      { new: true, upsert: true }
    );

    if (!updatedAttempt) {

      const newAttempt = new Attempt({
        user: decodedToken._id,
        test: testid,
        answers: answers.map((ans, index) => ({
          questionId: ans.questionId,
          answer: ans.answer,
          timeTaken: Math.floor((timeTaken[index]?.timeSpent || 0) / 1000),
          correct: performanceData[index]?.correct || false,
        })),
        score,
        testDuration: totalTimes,
        subjectScores,
        performanceData,
      });

      await newAttempt.save();
    }

    return res.status(200).json({
      message: "Result calculated successfully",
      score,
      subjectScores,
      performanceData,
      testDuration: totalTimes,
    });
  } catch (error) {
    console.error("Error calculating results:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getresult = async (req, res) => {
  try {
    const attempt = await Attempt.findOne({ user: req.user._id, test: req.params.id });

    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    return res.status(200).json(attempt);
  } catch (error) {
    console.error("Error fetching result:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = [calculateresult, getresult];
