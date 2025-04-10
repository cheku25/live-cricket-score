const apiKey = 1015c3d0-9a23-417e-815c-d48f9b65dbb8; // Replace with your actual CricAPI key
const scoreDiv = document.getElementById("score");

fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`)
  .then(response => response.json())
  .then(data => {
    if (data.status !== "success" || !data.data || data.data.length === 0) {
      scoreDiv.innerText = "No live matches found.";
      return;
    }

    const match = data.data[0];

    const teams = match.teams || [];
    const score = match.score || [];

    if (teams.length < 2) {
      scoreDiv.innerText = "Match info not available.";
      return;
    }

    let scoreText = `<strong>${teams[0]} vs ${teams[1]}</strong><br/>`;

    if (score.length > 0) {
      score.forEach((entry) => {
        scoreText += `${entry.inning}: ${entry.runs}/${entry.wickets} in ${entry.overs} overs<br/>`;
      });
    } else {
      scoreText += "Score not available yet.";
    }

    scoreDiv.innerHTML = scoreText;
  })
  .catch(error => {
    console.error("Fetch error:", error);
    scoreDiv.innerText = "Error loading scores.";
  });
