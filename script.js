const apiKey = "1015c3d0-9a23-417e-815c-d48f9b65dbb8"; // Replace with your actual CricAPI key
const scoreDiv = document.getElementById("score");

fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`)
  .then(response => response.json())
  .then(data => {
    if (data.status === "success" && data.data.length > 0) {
      const match = data.data[0]; // First live match
      const team1 = match.teams[0];
      const team2 = match.teams[1];
      const score = match.score || [];

      let scoreText = `<strong>${team1} vs ${team2}</strong><br/>`;

      score.forEach((entry) => {
        scoreText += `${entry.inning}: ${entry.runs}/${entry.wickets} in ${entry.overs} overs<br/>`;
      });

      scoreDiv.innerHTML = scoreText;
    } else {
      scoreDiv.innerText = "No live matches found or error fetching data.";
    }
  })
  .catch(error => {
    console.error("Error fetching data:", error);
    scoreDiv.innerText = "Error loading live scores.";
  });
