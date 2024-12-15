

const questionGame = [
    {
        question: "When did Bahrain get independence?",
        options: ["1971", "1981", "1951", "1961"],
        correctAnswerIndex: 0
    },
    {
        question: "When Oil was discovered in Bahrain?",
        options: ["1951", "1942", "1931", "1932"],
        correctAnswerIndex: 3
    },
    {
        question: "What is first name of Bahrain?",
        options: ["Dilmun", "Tylos", "Awal", "Manama"],
        correctAnswerIndex: 1
    },
    {
        question: "How many governorates in Bahrain?",
        options: ["5", "3", "2", "4"],
        correctAnswerIndex: 3
    },
    
    {
        question: "When did Bahrain win the Gulf Cup??",
        options: ["2011", "2017", "2019", "2022"],
        correctAnswerIndex: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const currentQuestion = questionGame[currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;

    const options = document.querySelectorAll('.option');
    currentQuestion.options.forEach((option, index) => {
        options[index].textContent = option;
    });
    document.getElementById('result-container').style.display = 'none';
}

function checkAnswer(selectedOptionIndex) {
    const currentQuestion = questionGame[currentQuestionIndex];
    const isCorrect = selectedOptionIndex === currentQuestion.correctAnswerIndex;
    
    if (isCorrect) {
        score++;
        document.getElementById('result').textContent = "Correct! Well done.";
        document.getElementById('result').style.color = "green";
    } else {
        document.getElementById('result').textContent = "Incorrect. Try again!";
        document.getElementById('result').style.color = "red";
    }
    
    document.getElementById('result-container').style.display = 'block';
    document.querySelectorAll('.option').forEach(button => button.disabled = true);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questionGame.length) {
        loadQuestion();
        document.querySelectorAll('.option').forEach(button => button.disabled = false);
    } else {
        document.getElementById('quiz-container').innerHTML = `
            <h2>Thank You</h2>
            <p>Your score: ${score} out of ${questionGame.length}</p>
        `;
    }
}


loadQuestion()

