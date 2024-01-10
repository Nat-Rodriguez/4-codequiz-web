// Function to display highscores
function printHighscores() {
  // Retrieve highscores from localStorage or set an empty array
  var highscores = JSON.parse(localStorage.getItem('highscores'));
  if (!highscores) {
    highscores = [];
  }

  // Sort highscores by score in descending order
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  // Display highscores on the page
  var olEl = document.getElementById('highscores');
  olEl.innerHTML = '';

  for (var i = 0; i < highscores.length; i++) {
    var liTag = document.createElement('li');
    liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;
    olEl.appendChild(liTag);
  }
}

// Function to clear highscores
function clearHighscores() {
  localStorage.removeItem('highscores');
  location.reload(); // Reload the page
}

// Event listener for the clear button
var clearButton = document.getElementById('clear');
clearButton.addEventListener('click', clearHighscores);

// Display highscores when the page loads
printHighscores();
