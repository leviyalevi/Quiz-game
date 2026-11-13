
const questions = [
    {
        question: "What is the full form of CPU?",
        answers: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Control Processing Unit"],
        correct: 0
    },
    {
        question: "Which language is used for web styling?",
        answers: ["HTML", "Python", "CSS", "Java"],
        correct: 2
    },
    {
        question: "Which is an operating system?",
        answers: ["Google", "Windows", "HTML", "CSS"],
        correct: 1
    },
    {
        question: "What does HTML stand for?",
        answers: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Markup Language", "Home Text Language"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function loadQuestion() {
    answered = false;
    document.getElementById("question").innerText =
        questions[currentQuestion].question;

    let buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach((button, index) => {
        button.innerText = questions[currentQuestion].answers[index];
        button.disabled = false;
        button.style.background = "#667eea";
    });
}

function checkAnswer(index) {
    if (answered) return;
    answered = true;

    let correct = questions[currentQuestion].correct;
    let buttons = document.querySelectorAll(".answer-btn");

    if (index === correct) {
        score++;
        buttons[index].style.background = "green";
    } else {
        buttons[index].style.background = "red";
        buttons[correct].style.background = "green";
    }

    buttons.forEach(button => button.disabled = true);

    document.getElementById("score").innerText = "Score: " + score;
}

function nextQuestion() {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        document.querySelector(".quiz-container").innerHTML =
            "<h1>Quiz Completed!</h1>" +
            "<h2>Your Score: " + score + "/" + questions.length + "</h2>" +
            "<button onclick='location.reload()'>Play Again</button>";
    }
}

loadQuestion();
