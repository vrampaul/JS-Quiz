var secsElement = document.querySelector("#secs");
var startButton = document.querySelector("#start-quiz");
var messageElement = document.querySelector("h1");
var mainElement = document.querySelector("#main-content");
var textElement = document.querySelector("p");
var choicesListElement = document.querySelector("#choices-list");
var timerSpan = document.createElement("span");

var questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["A. <Javascript>", "B. <js>", "C. <script>"],
    answer: 2,
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    choices: [
      "A. The <head> section",
      "B. The <body> section",
      "C. Both are correct",
    ],
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xx.js'?",
    choices: [
      "A. <script href='xx.js'>",
      "B. <script name='xx.js'>",
      "C. <script src='xx.js'>",
    ],
    answer: 2,
  },
  {
    question: "Which class provides a responsive fixed width container?",
    choices: ["A. .container-fluid", "B. .container-fixed", "C. .container"],
    answer: 1,
  },
  {
    question: "What does HTML stand for?",
    choices: [
      "A. Hyper Text Markup Language",
      "B. Hyperlinks and Text Markup Language",
      "C. Home Tool Markup Language",
    ],
    answer: 0,
  },
];

var secondsLeft;
var message = "Coding Quiz Challenge";
var score = 0;

init();

function init() {
  secondsLeft = 30;
  messageElement.innerHTML = message;
    var score = 0;
}

function startQuiz() {
  textElement.remove();
  startButton.remove();
  var timerInterval = setInterval(function () {
    secondsLeft--;
    secsElement.textContent = secondsLeft;

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      messageElement.textContent = "Quiz is over! Your score is " + score + " points";
      //alert("Time's up! Your score is " + score + " points");
      //return;
    }
  }, 1000);

  renderQuestions();
}

function renderQuestions(questionNumber) {
  questionNumber = questionNumber || 0;
  var questionItem = questions[questionNumber];
  messageElement.textContent = questionItem.question;

  var newChoices = document.createElement("div");
  choicesListElement.appendChild(newChoices);

  for (var j = 0; j < questionItem.choices.length; j++) {
    var choice = questionItem.choices[j];

    var li = document.createElement("li");
    li.setAttribute("data-index", j);
    li.textContent = choice;
    newChoices.appendChild(li);

    li.addEventListener("click", function (event) {
      console.log(questionItem.answer);
      console.log(event.target.getAttribute("data-index"));
      if (
        questionItem.answer ===
        parseInt(event.target.getAttribute("data-index"))
      ) {
        score++;
        //alert("+1 point");
        alert("correct");
      } else {
        secondsLeft -= 10;
        alert("wrong answer");
      }
      questionNumber++;
      newChoices.remove();

      if (questionNumber === questions.length) {
        messageElement.textContent = "Quiz is over! Your score is " + score + " points";
      } else {
        renderQuestions(questionNumber);
      }
    });
  }
}

startButton.addEventListener("click", startQuiz);