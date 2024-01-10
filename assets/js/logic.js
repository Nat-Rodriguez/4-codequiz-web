var currentQuestionIndex = 0;
var time = quiz.length * 10;
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
    title: 'Which keyword is used to declare a variable that cannot be reassigned?',
    choices: ['const', 'var', 'static'],
    answer: 'const',
  },
  {
    title: 'What does the `===` operator do in JavaScript?',
    choices: [ 'Assigns a value to a variable', 'Compares two values for equality', 'Checks if a value is less than or equal to another value'],
    answer: 'Compares two values for equality',
  },
  {
    title: 'Which function is used to print content to the console in JavaScript?',
    choices: [ 'console.log()', 'print()', 'display()'],
    answer: 'console.log()',
  },
  {
    title: 'Which symbol is used for comments in HTML?',
    choices: [ '<!-- -->', '//', '#'],
    answer: '<!-- -->',
  },
  {
    title: 'What keyword is used to declare a function in JavaScript?',
    choices: [ 'define', 'post', 'function'],
    answer: 'function',
  },
  {
    title: 'Which of the following methods is used to access HTML elements using Javascript?',
    choices: [ 'getElementbyId()', 'getElementbyClassName()', 'both'],
    answer: 'both',
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

  // loop over choices
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    // create new button for each choice
    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);

    choiceNode.textContent = i + 1 + '. ' + choice;

    // display on the page
    choicesEl.appendChild(choiceNode);
}};

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

    // Display the feedback for a short duration
    feedbackEl.className = 'feedback';
    setTimeout(function () {
      feedbackEl.className = 'feedback hide';
    }, 1000);

    currentQuestionIndex++;

    // Check if there are more questions or time is up
    if (time <= 0 || currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      // Display the next question
      getQuestion();
    }
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
