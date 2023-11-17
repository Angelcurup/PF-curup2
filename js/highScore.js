const highScoreList = document.getElementById("highScoreList");
const highScores = JSON.parse(localStorage.getItem("highestScore")) || [];

highScoreList.innerHTML = highScores
  .map((score) => {
    if (highScoreList === "username"){
      localStorage.setItem("mostRecentScore" + score);
    }
    return `<li class="high-score">
            <span class="high-name">${score.name}</span>
            <span class="high-points">${score.score}</span>        
            </li>`;
  })
  .join("");
