const questions = [
    { question: "What is the capital of Bahrain?", options: ["Manama", "Riffa", "Muharraq", "Sitra"], correct: 0 },
    { question: "What is Bahrain's national animal?", options: ["Falcon", "Oryx", "Dove", "Lion"], correct: 1 },
    { question: "When did Bahrain become an independent state?", options: ["1971", "1965", "1980", "1990"], correct: 0 },
    { question: "What is the currency of Bahrain?", options: ["Riyal", "Dinar", "Dollar", "Pound"], correct: 1 },
    { question: "Which sea borders Bahrain?", options: ["Mediterranean Sea", "Arabian Sea", "Persian Gulf", "Red Sea"], correct: 2 },
    { question: "What is the largest city in Bahrain?", options: ["Manama", "Riffa", "Muharraq", "Sitra"], correct: 0 },
    { question: "Bahrain is known as the 'Island of'?", options: ["Pearls", "Gold", "Spices", "Silk"], correct: 0 },
    { question: "Which year was the Bahrain Formula One Grand Prix first held?", options: ["2004", "2005", "2006", "2007"], correct: 0 },
    { question: "What is the predominant religion in Bahrain?", options: ["Christianity", "Islam", "Hinduism", "Buddhism"], correct: 1 },
    { question: "What is the official language of Bahrain?", options: ["English", "Arabic", "Farsi", "French"], correct: 1 },
    { question: "What is Bahrain's main industry?", options: ["Oil and Gas", "Tourism", "Technology", "Agriculture"], correct: 0 },
    { question: "What is the national sport of Bahrain?", options: ["Football", "Cricket", "Basketball", "Horse Racing"], correct: 3 },
    { question: "Which country is connected to Bahrain by a causeway?", options: ["Saudi Arabia", "Qatar", "UAE", "Kuwait"], correct: 0 },
    { question: "What is the traditional boat of Bahrain called?", options: ["Dhow", "Felucca", "Sampan", "Junk"], correct: 0 },
    { question: "What is the national flower of Bahrain?", options: ["Bougainvillea", "Rose", "Date Palm Flower", "Lily"], correct: 2 },
    { question: "What is Bahrain's climate?", options: ["Tropical", "Desert", "Mediterranean", "Temperate"], correct: 1 },
    { question: "What is a famous Bahraini dish?", options: ["Machboos", "Biryani", "Shawarma", "Tabbouleh"], correct: 0 },
    { question: "What is the name of Bahrain's national airline?", options: ["Gulf Air", "Emirates", "Qatar Airways", "Etihad"], correct: 0 },
    { question: "What is the name of Bahrain's king?", options: ["King Hamad", "King Salman", "King Abdullah", "King Khalifa"], correct: 0 },
    { question: "What is Bahrain's national flag color scheme?", options: ["Red and White", "Green and White", "Black and White", "Blue and White"], correct: 0 },
    { question: "Which island is part of Bahrain?", options: ["Hawar Islands", "Socotra", "Lamu", "Farasan"], correct: 0 },
    { question: "What is Bahrain's rank in oil production globally?", options: ["Small-scale producer", "Top 10", "Top 50", "Not a producer"], correct: 0 },
    { question: "What is the highest point in Bahrain?", options: ["Jebel Dukhan", "Mount Everest", "Hawar Peak", "Jebel Hafeet"], correct: 0 },
    { question: "When was the Bahrain National Museum established?", options: ["1988", "1990", "1985", "1995"], correct: 0 },
    { question: "What does 'Bahrain' mean in Arabic?", options: ["Two Seas", "Two Mountains", "Two Deserts", "Two Rivers"], correct: 0 }
];

let currentQuestions = [];
let usedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const homeBtn = document.getElementById('homeBtn');
const questionContainer = document.getElementById('questionContainer');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const scoreDisplay = document.getElementById('scoreDisplay');
const feedback = document.getElementById('feedback');
const progress = document.getElementById('progress');

function getUnusedQuestions() {
    const unused = questions.filter(q => !usedQuestions.includes(q));
    console.log('Unused questions:', unused);
    const selectedQuestions = shuffleArray(unused).slice(0, 5);
    
   
    if (unused.length > 5) {
        selectedQuestions.push(shuffleArray(unused.slice(5))[0]);
    }

    console.log('Selected questions:', selectedQuestions);
    return selectedQuestions;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startQuiz() {
    currentQuestions = getUnusedQuestions();
    usedQuestions = usedQuestions.concat(currentQuestions);
    currentQuestionIndex = 0;
    score = 0;
    startBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';
    questionContainer.style.display = 'block';
    scoreDisplay.textContent = '';
    feedback.textContent = '';
    displayQuestion();
}

function displayQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    questionElement.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}: ${question.question}`;
    optionsElement.innerHTML = '';

    progress.style.width = `${(currentQuestionIndex / currentQuestions.length) * 100}%`;
    console.log(`Displaying question ${currentQuestionIndex + 1}:`, question);

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'btn';
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(index));
        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const buttons = optionsElement.getElementsByClassName('btn');
    Array.from(buttons).forEach(button => {
        button.disabled = true;
        if (buttons[currentQuestions[currentQuestionIndex].correct] === button) {
            button.classList.add('correct');
        }
    });

    const correct = currentQuestions[currentQuestionIndex].correct === selectedIndex;
    if (correct) {
        buttons[selectedIndex].classList.add('correct');
        score++;
        console.log(`Correct answer selected: ${buttons[selectedIndex].textContent}`);
    } else {
        buttons[selectedIndex].classList.add('wrong');
        console.log(`Wrong answer selected: ${buttons[selectedIndex].textContent}`);
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    questionContainer.style.display = 'none';
    progress.style.width = '100%';
    scoreDisplay.textContent = `Final Score: ${score}/${currentQuestions.length}`;

    let emoji = '';
    let message = '';

    if (score === currentQuestions.length) {
        emoji = '🏆 🇧🇭';
        message = 'Perfect! You are a Bahrain Expert!';
    } else if (score >= currentQuestions.length - 1) {
        emoji = '🌟 🇧🇭';
        message = 'Excellent! Almost perfect!';
    } else if (score >= currentQuestions.length - 2) {
        emoji = '👍 🇧🇭';
        message = 'Good job! Keep learning!';
    } else {
        emoji = '💪 🇧🇭';
        message = 'Keep studying Bahrain\'s history!';
    }

    feedback.textContent = `${emoji} ${message}`;
    console.log(`Quiz ended. Final score: ${score}/${currentQuestions.length}`);
}

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);
homeBtn.addEventListener('click', () => {
    location.reload();
});


