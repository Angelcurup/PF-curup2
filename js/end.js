// pagina-end
const saveScoreBtn = document.getElementById("saveScoreBtn");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("finalScore");

const highScore = JSON.parse(localStorage.getItem("highestScore")) || [];
console.log(highScore);

finalScore.innerText = mostRecentScore;

saveHighScore = (e) => {
  console.log("Clicked the save button!");
  e.preventDefault();

  const score = {
    score: mostRecentScore,
  };
  highScore.push(score);

  localStorage.setItem("highestScore", JSON.stringify(highScore));

  console.log(highScore);
};
