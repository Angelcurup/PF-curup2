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
let questions = [];
fetch(
  "https://opentdb.com/api.php?amount=20&category=23&difficulty=easy&type=multiple"
)
  .then((res) => {
    console.log(res);
    return res.json();
  })
  .then((loadedQuestions) => {
    console.log(loadedQuestions);
    questions = loadedQuestions.results.map((loadedQuestion) => {
      const formattedQuestion = {
        question: loadedQuestion.question,
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });

      return formattedQuestion;
    });
    startGame();
  })
  .catch((err) => {
    console.error(err);
  });

//constants
const points = 5;
const maxQuestions = 20;

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
    localStorage.setItem("mostRecentScore", score);

    // ir al final de la pagina
    return window.location.assign("../pages/end.html");
  }

  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${maxQuestions}`;
  // progres-bar
  console.log(`Progres-bar: ` + (questionCounter / maxQuestions) * 100);
  progresBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

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

    if (classToApply == "correct") {
      incrementScore(points);
      console.log("Score: " + score);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);

      console.log(`Answer: ${choice.innerText} ` + classToApply);
      getNewQuestion();
    }, 2000);
  });
});

incrementScore = (num) => {
  score += num;
};

let btn = document.getElementById("btnBg");
btn.addEventListener("mousemove", (e) => {
  let rect = e.target.getBoundingClientRect();
  let x = e.clientX * 3 - rect.left;
  btn.style.setProperty("--x", x + "deg");
});
