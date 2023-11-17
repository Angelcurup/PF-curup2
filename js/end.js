// pagina-end
const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("finalScore");

const maxHighScore = 10;
username.addEventListener("keyup", () => {
  console.log(username.value);
  saveScoreBtn.disabled = !username.value;
});

const highScore = JSON.parse(localStorage.getItem("highestScore")) || [];
console.log(highScore);

finalScore.innerText = mostRecentScore;

saveHighScore = (e) => {
  console.log("Clicked the save button!");
  e.preventDefault();
  
  const score = {
    score: mostRecentScore,
    name: username.value,
  };
  highScore.push(score);
  highScore.sort((a, b) => b.score - a.score);
  highScore.splice(5);
  localStorage.setItem("highestScore", JSON.stringify(highScore));
  
  console.log(highScore);
};


