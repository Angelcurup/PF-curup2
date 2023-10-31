const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const progresBarFull = document.getElementById("progresBarFull");

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let avalibleQuestion = [];
// Questions-Sports
let questions = [
  {
    question: "What is the most popular sport throughout the worl?",
    choice1: "Volleyball",
    choice2: "Football",
    choice3: "Basketball",
    choice4: "Badminton",
    answer: 2,
  },
  {
    question: "Who is considered the best basketball player of all time?",
    choice1: "LeBron James",
    choice2: "Kobe Bryant",
    choice3: "Kareem Abdul-Jabbar",
    choice4: "Micheal Jordan",
    answer: 4,
  },
  {
    question: "In which country was volleyball invented?",
    choice1: "Canada",
    choice2: "United States",
    choice3: "Spain",
    choice4: "Japan",
    answer: 2,
  },
  {
    question: "Who won four consecutive Formula 1 world championships?",
    choice1: "Max Verstappen",
    choice2: "Sergio Pérez",
    choice3: "Sebastián Vettel",
    choice4: "Pierre Gasly",
    answer: 3,
  },
  {
    question: "Who won the 2010 World Cup?",
    choice1: "Spain",
    choice2: "Brazil",
    choice3: "Mexico",
    choice4: "Argentina",
    answer: 1,
  },
];

//constants
const points = 20;
const maxQuestions = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  avalibleQuestion = [...questions];
  console.log(avalibleQuestion);
  getNewQuestion();
};
// mostrar pregunta en html
getNewQuestion = () => {
  if (avalibleQuestion.length === 0 || questionCounter > maxQuestions) {
    localStorage.setItem('mostRecentScore', score);

    // ir al final de la pagina
    return window.location.assign("/pages/end.html");
  }

  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${maxQuestions}`;
  // progres-bar
  console.log(`Progres-bar: ` + (questionCounter / maxQuestions) * 100);
  progresBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`

  const questionIndex = Math.floor(Math.random() * avalibleQuestion.length);
  currentQuestion = avalibleQuestion[questionIndex];
  question.innerText = currentQuestion.question;
  // mostrar posibles rspuestas
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  avalibleQuestion.splice(questionIndex, 1);
  acceptingAnswer = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswer) return;

    acceptingAnswer = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply == 'correct') {
      incrementScore(points)
      console.log('Score: ' + score);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout( () => {
      selectedChoice.parentElement.classList.remove(classToApply)

      console.log(`Answer: ${choice.innerText} ` + classToApply);
      getNewQuestion();
    }, 2000)
  });
});

incrementScore = num => {
  score += num;
}

startGame();

// redireccion de paginas
function init() {
  location.href = "/index.html";
}
function redireccion() {
  location.href = "/pages/sports.html";
}