const Attempt = require("../models/attempttest");
const Test = require("../models/tests");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const calculateresult = async (req, res) => {
    try {
        const { userid, testid, answers, timeTaken } = req.body; 
        const decodedToken = jwt.decode(userid); 

        if (!decodedToken || !decodedToken._id) {
            return res.status(400).json({ message: "Invalid token" });
        }

        const test = await Test.findById(testid).populate("subjects");
        console.log(test);
        console.log(userid);

        if (!test) {
            return res.status(404).json({ message: "Test not found" });
        }

        let score = 0;
        let subjectScores = {};
        let totalTime = 0; 
        const performanceData = [];

        // Loop over answers and process them
        for (let answer of answers) {
            const question = test.subjects
                .flatMap(subject => subject.questions)
                .find(q => q._id.equals(new mongoose.Types.ObjectId(answer.questionId)));

            if (question) {
                const timeTakenForQuestion = answer.timeTaken || 0; // Capture time taken for each question
                totalTime += timeTakenForQuestion;

                const subjectName = test.subjects
                    .find(subject => subject.questions.some(q => q._id.equals(question._id)))
                    .subjectname;

                if (!subjectScores[subjectName]) {
                    subjectScores[subjectName] = { score: 0, totalQuestions: 0 };
                }

                if (question.correctAnswer === answer.answer) {
                    score++;
                    subjectScores[subjectName].score++;
                }

                subjectScores[subjectName].totalQuestions++;

                performanceData.push({
                    questionId: question._id,
                    timeTaken: timeTakenForQuestion,
                    correct: question.correctAnswer === answer.answer
                });
            }
        }

        score = score * 4; // Assuming 4 marks per correct answer
        const attempt = new Attempt({
            user: decodedToken._id,
            test: testid,
            answers,
            score: score,
            testDuration: totalTime || 0, // Total time for the test
        });

        await attempt.save();

        return res.status(200).json({
            message: "Result calculated",
            score,
            subjectScores,
            performanceData,
            testDuration: totalTime,
        });
    } catch (error) {
        console.error("Error calculating results:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getresult = async (req, res) => {
    const id = req.params.id;
    const userid = req.user._id;

    const attempt = await Attempt.findOne({
        user: userid,
        test: id,
    });

    if (attempt) {
        return res.status(200).json(attempt);
    } else {
        return res.status(404).json({ message: "Attempt not found" });
    }
};

module.exports = [calculateresult, getresult];
