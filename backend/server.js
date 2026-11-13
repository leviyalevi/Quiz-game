
const express = require("express");
const cors = require("cors");
const questions = require("./questions");

const app = express();

app.use(cors());
app.use(express.json());

// Get all quiz questions
app.get("/api/questions", (req, res) => {
    const quizQuestions = questions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options
    }));

    res.json(quizQuestions);
});

// Submit answers and calculate score
app.post("/api/submit", (req, res) => {
    const { answers } = req.body;

    if (!Array.isArray(answers)) {
        return res.status(400).json({
            message: "Invalid answers"
        });
    }

    let score = 0;

    answers.forEach(item => {
        const question = questions.find(
            q => q.id === Number(item.questionId)
        );

        if (
            question &&
            Number.isInteger(item.selectedAnswer) &&
            item.selectedAnswer === question.answer
        ) {
            score++;
        }
    });

    res.json({
        message: "Quiz completed successfully!",
        totalQuestions: questions.length,
        score: score,
        percentage: (score / questions.length) * 100
    });
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
