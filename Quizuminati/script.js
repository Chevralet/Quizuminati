// Quiz Data
const quizData = [
  { question: "Which secret society is rumored to have influenced modern banking?", options: ["Knights Templar", "Freemasons", "Illuminati", "Rothschild"], answer: 3 },
  { question: "Which group is famous for its symbols at Bohemian Grove?", options: ["Skull & Bones", "Bohemian Grove", "Hermetic Order", "Illuminati"], answer: 1 },
  { question: "Which society is linked to Yale University?", options: ["Freemasons", "Skull & Bones", "Illuminati", "Knights Templar"], answer: 1 },
  { question: "The all-seeing eye symbol is associated with?", options: ["Illuminati", "Bohemian Grove", "Rothschild", "Hermetic"], answer: 0 },
  { question: "Which society is known for secret handshakes and rituals?", options: ["Freemasons", "Skull & Bones", "Rothschild", "Bohemian Grove"], answer: 0 },
  { question: "Rothschild family is famously linked to?", options: ["Finance", "Art", "Science", "Sports"], answer: 0 },
  { question: "Hermetic principles originate from?", options: ["Ancient Greece", "Egypt", "Rome", "Mesopotamia"], answer: 1 },
  { question: "Which group inspired conspiracy theories about world control?", options: ["Illuminati", "Freemasons", "Skull & Bones", "Knights Templar"], answer: 0 },
  { question: "Which society’s rituals are mostly in secrecy in California?", options: ["Bohemian Grove", "Illuminati", "Skull & Bones", "Freemasons"], answer: 0 },
  { question: "Knights Templar originally served as?", options: ["Bankers", "Monks", "Warriors", "Merchants"], answer: 2 },
  { question: "Which secret society uses coded symbolism extensively?", options: ["Hermetic", "Rothschild", "Bohemian Grove", "Knights Templar"], answer: 0 }
];

let currentQuestionIndex = 0;
let score = 0;
let secretCounter = 0; // Track first-option clicks for secret page

// DOM Elements
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const scoreContainer = document.getElementById('score-container');
const scoreText = document.getElementById('score');
const progressText = document.getElementById('progress-text');
const progressFill = document.getElementById('progress-fill');

// Start Quiz
startButton.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  loadQuestion();
});

// Load Question
function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionContainer.textContent = currentQuestion.question;
  optionsContainer.innerHTML = '';

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => selectOption(button, index));
    optionsContainer.appendChild(button);
  });

  updateProgress();
}

// Handle Answer Selection
function selectOption(button, index) {
  const correct = quizData[currentQuestionIndex].answer;
  const buttons = optionsContainer.querySelectorAll('button');
  buttons.forEach(btn => btn.disabled = true);

  // Secret sequence logic
  if(index === 0){
    secretCounter++;
    if(secretCounter === quizData.length){
      // All first options clicked, go to secret page
      window.location.href = "secret.html";
      return;
    }
  } else {
    secretCounter = 0; // Reset counter if not first option
  }

  // Normal feedback
  if(index === correct){
    button.classList.add('correct');
    score++;
  } else {
    button.classList.add('incorrect');
    buttons[correct].classList.add('correct');
  }

  // Next question delay
  setTimeout(() => {
    currentQuestionIndex++;
    if(currentQuestionIndex < quizData.length){
      loadQuestion();
    } else {
      showScore();
    }
  }, 1000); // 1s delay for feedback
}

// Show Score
function showScore() {
  quizContainer.classList.add('hidden');
  scoreContainer.classList.remove('hidden');
  scoreText.textContent = `You answered ${score} out of ${quizData.length} correctly!`;
}

// Restart Quiz
document.getElementById('restart-button').addEventListener('click', () => {
  currentQuestionIndex = 0;
  score = 0;
  secretCounter = 0;
  scoreContainer.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  loadQuestion();
});

// Update Progress Bar
function updateProgress() {
  progressText.textContent = `Question ${currentQuestionIndex + 1} / ${quizData.length}`;
  progressFill.style.width = `${((currentQuestionIndex + 1)/quizData.length)*100}%`;
}
