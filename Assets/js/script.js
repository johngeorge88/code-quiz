var timer;
var questionsIndex = 0;
var hideEl = 0;

// Variable for all the questions and answers
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
      },
      {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
      },
      {
        title: "Arrays in JavaScript can be used to store ____.",
        choices: [
          "numbers and strings",
          "other arrays",
          "booleans",
          "all of the above"
        ],
        answer: "all of the above"
      },
      {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
      },
      {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log"
      }
];

// other vaiables for DOM
var timerEl = document.getElementById("timer");
var startBtn = document.getElementById("start");
var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("questionsChoices");

// Start quiz function
function startQuiz() {
    // Hide welcome Screen
    var welcomeScreenEl = document.getElementById("welcomeScreen");
    welcomeScreenEl.style.display = "none";
    // Start Timer
    timer = 75;
    timerEl.textContent = timer;
    var timerCountDown = setInterval(function () {
      if (questionsIndex != questions.length -1){
        timer --;
      }
        timerEl.textContent = timer;
        // If time reaches 0
        if (timer <= 0) {
            clearInterval(timerCountDown);
            endQuiz();
        }
        if (hideEl == 3){
          document.getElementById("checkAnswer").style.display ="none";
        } else  {
          hideEl ++;
          document.getElementById("checkAnswer").style.display ="block";
        }

    },1000);

    // Start the questions
    startQuestions();
};

function endQuiz () {
  var questions = document.getElementById("questions");
    questions.style.display = "none";
    clearInterval(timerCountDown);
}
function correct() {
  if (questionsIndex == questions.length -1){
    endQuiz()
  } else {
    hideEl = 0;
    questionsIndex ++;
    choicesEl.textContent = "";
    startQuestions()
    var answerEl = document.getElementById("checkAnswer");
    answerEl.textContent = "Correct answer";

  }
};

function incorrect() {
  if (questionsIndex == questions.length -1){
    endQuiz()
  } else {
    hideEl = 0;
    timer -= 15;
    var answerEl = document.getElementById("checkAnswer");
    answerEl.textContent = "Incorect answer";
    questionsIndex ++;
    choicesEl.textContent = "";
    startQuestions()
  }
};
// Questions starting function
function startQuestions() {
  
    var currentQuestion = questions[questionsIndex];
    // Adding the question title
    var titelEl = document.getElementById("questionsTitle");
    titelEl.textContent = currentQuestion.title;

    for (var i = 0; i < currentQuestion.choices.length; i++) {
      var qChoices = document.createElement("button");
      var listItem = document.createElement("li");
      if (currentQuestion.answer == currentQuestion.choices[i]) {
        qChoices.addEventListener("click", correct)
        
      } else {
        qChoices.addEventListener("click", incorrect)
      }

      qChoices.textContent = currentQuestion.choices[i];
      listItem.appendChild(qChoices);
      choicesEl.appendChild(listItem);
    }

};

// Event Listeners
startBtn.onclick = startQuiz;