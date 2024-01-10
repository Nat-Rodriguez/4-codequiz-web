var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');

var questions = [
  {
    title: 'Question 1',
    choices: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
    answer: 'Choice 2' // Replace this with the correct answer
  },
  // Add more questions similarly
];

function startQuiz() {
  var startScreenEl = document.getElementById('start-screen');
  startScreenEl.style.display = 'none';

  questionsEl.style.display = 'block';

  timerId = setInterval(clockTick, 1000);

  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];

  var titleEl = document.getElementById('question-title');
  titleEl.textContent = currentQuestion.title;

  choicesEl.innerHTML = '';

  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement('button');
    choiceNode.className = 'choice';
    choiceNode.value = choice;

    choiceNode.textContent = i + 1 + '. ' + choice;

    choicesEl.appendChild(choiceNode);
  }
}

function questionClick(event) {
  var buttonEl = event.target;

  if (!buttonEl.matches('.choice')) {
    return;
  }

  if (buttonEl.value !== questions[currentQuestionIndex].answer) {
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    timerEl.textContent = time;

    feedbackEl.textContent = 'Wrong!';
  } else {
    feedbackEl.textContent = 'Correct!';
  }

  feedbackEl.className = 'feedback';
  setTimeout(function () {
    feedbackEl.className = 'feedback hide';
  }, 1000);

  currentQuestionIndex++;

  if (time <= 0 || currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  clearInterval(timerId);

  var endScreenEl = document.getElementById('end-screen');
  endScreenEl.style.display = 'block';

  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = time;

  questionsEl.style.display = 'none';
}

function clockTick() {
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  var initials = initialsEl.value.trim();

  if (initials !== '') {
    var highscores =
      JSON.parse(window.localStorage.getItem('highscores')) || [];

    var newScore = {
      score: time,
      initials: initials,
    };

    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    window.location.href = 'highscores.html';
  }
}

function checkForEnter(event) {
  if (event.key === 'Enter') {
    saveHighscore();
  }
}

submitBtn.onclick = saveHighscore;
startBtn.addEventListener('click', startQuiz);
choicesEl.onclick = questionClick;
initialsEl.onkeyup = checkForEnter;
