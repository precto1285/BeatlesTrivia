// Objective: Create a JavaScript quiz game that takes multiple answers and shows a result to the user.

//game questions
var questions = [
  {
    qstn: '1. Who is the oldest Beatle by age?',

    answers: [
      { answerText: 'Paul', correct: false },
      { answerText: 'John', correct: false },
      { answerText: 'Ringo', correct: true },
      { answerText: 'George', correct: false }
    ]
  },
  {
    qstn: '2. What was their hairstyle called?',

    answers: [
      { answerText: 'The Mop Top', correct: true },
      { answerText: 'Comb Over', correct: false },
      { answerText: 'Rat Tail', correct: false },
      { answerText: 'The Mohawk', correct: false }
    ]
  },
  {
    qstn: '3. Where did George meet John?',

    answers: [
      { answerText: 'In Germany', correct: false },
      { answerText: 'In school', correct: false },
      { answerText: 'In a townhall', correct: false },
      { answerText: 'On a double decker bus', correct: true }
    ]
  },
  {
    qstn: '4. Who has the middle name "Winston"?',

    answers: [
      { answerText: 'Paul', correct: false },
      { answerText: 'George', correct: false },
      { answerText: 'John', correct: true },
      { answerText: 'Ringo', correct: false }
    ]
  },
  {
    qstn: '5. Where are The Beatles from?',

    answers: [
      { answerText: 'New York', correct: false },
      { answerText: 'London', correct: false },
      { answerText: 'Liverpool', correct: true },
      { answerText: 'Germany', correct: false }
    ]
  },
  {
    qstn: '6. What is the favorite accessory of Ringo?',

    answers: [
      { answerText: 'Cufflings', correct: false },
      { answerText: 'Necklaces', correct: false },
      { answerText: 'Rings', correct: true },
      { answerText: 'Hats', correct: false }
    ]
  },
  {
    qstn: '7. Who played the Lead Guitar in "While My Guitar Gently Weeps"?',

    answers: [
      { answerText: 'George', correct: false },
      { answerText: 'John', correct: false },
      { answerText: 'Eric', correct: true },
      { answerText: 'James', correct: false }
    ]
  },
  {
    qstn: '8. What would Paul eat?',

    answers: [
      { answerText: 'Cheeseburger', correct: false },
      { answerText: 'Surf & Turf', correct: false },
      { answerText: 'Kale Chips', correct: true },
      { answerText: 'Eggs Benedict', correct: false }
    ]
  },
  {
    qstn: '9. Who wrote the song "Yellow Submarine"?',

    answers: [
      { answerText: 'Starkey', correct: false },
      { answerText: 'Harrison', correct: false },
      { answerText: 'Lennon/McCartney', correct: true },
      { answerText: 'George Martin', correct: false }
    ]
  },
  {
    qstn: '10. Where did they make music?',
    answers: [
      { answerText: 'Apple Music Corp', correct: false },
      { answerText: 'Tower Records', correct: false },
      { answerText: 'Abbey Road', correct: true },
      { answerText: 'Lennon/McCartney Productions', correct: false }
    ]
  }
]

//This variable is for holding the number of correct answers guessed by the user.
var correctAnswers = 0;

//This variable is for holding the number of incorrect answers guessed by the user.
var incorrectAnswers = 0;

//This variable is for holding the number of times the question was skipped due to no answered selected.
var unanswered = 0;


var currentQuestion = 0;

var intervalId;

var timerRunning = false;

// Create a timer
var timer = {
  time: 10,  // Timer is set to 10 seconds

  // function to reset timer
  reset: function () {
    timer.time = 10;
    $('#time').html('10');
    clearInterval(intervalId);
    timerRunning = false;
  },
  // function to start timer
  start: function () {
    if (!timerRunning) {
      $('#time').html('<h3>Time Remaining: ' + timer.time + '</h3>')
      intervalId = setInterval(timer.count, 1000);
      timerRunning = true;
    }
  },
  // function to show count
  count: function () {
    timer.time--;
    $('#time').html('<h3>Time Remaining: ' + timer.time + '</h3>');
    if (timer.time === 0) {
      answer();
    }
  }
}

// Function to Show Questions:
function question() {
  timer.reset();
  timer.start();
  $('#answers').empty();
  $('#question').html(questions[currentQuestion].qstn);
  for (var i = 0; i < questions[currentQuestion].answers.length; i++) {
    var button = $('<button onclick="answer(' + i + ')" class="btn btn-primary answerButton m-2">' + questions[currentQuestion].answers[i].answerText + '</button>');
    $('#answers').append(button);
  }
}

// Function to Generate Next Question:
function nextQuestion() {
  currentQuestion = currentQuestion + 1;
  if (currentQuestion < questions.length) {
    question();
  } else {
    gameSummary();
  }
}

// Function to Start Game:
function startGame() {
  timer.reset();
  timer.start();
  $('#summary').empty();
  $('#correctAnswers').empty();
  $('#incorrectAnswers').empty();
  $('#unanswered').empty();

  correctAnswers = 0;
  incorrectAnswers = 0;
  unanswered = 0;
  currentQuestion = 0;
  question();
}

// Function to Reset Game:
function resetGame() {
  timer.reset();  // reset timer
  $('#time').empty();  // empty time
  $('#question').empty(); // empty question
  $('#answers').empty(); // empty answers
  $('#summary').empty();  // empty out the summary
  $('#correctAnswers').empty();  // empty correct answers count
  $('#incorrectAnswers').empty();  // empty incorrect answers count
  $('#unanswered').empty();  // empty unanswered count


  // Zero out values
  correctAnswers = 0;
  incorrectAnswers = 0;
  unanswered = 0;
  currentQuestion = 0;
}
// Function to show Answer:
function answer(i) {
  // Variable to hold the question chosen
  var choice = questions[currentQuestion].answers[i];
  // Computer will loop through the current questions answers
  for (var i = 0; i < questions[currentQuestion].answers.length; i++) {
    // If answer is correct add answer to rightAnswer variable
    if (questions[currentQuestion].answers[i].correct === true) {
      var rightAnswer = questions[currentQuestion].answers[i].answerText;
    }
  }
  // if question answered within 10 seconds
  if (timer.time > 0) {

    // if Answer is true
    if (choice.correct === true) {
      setTimeout(function () {
        alert('Great Job!');
      }, 1000);  // alert will disappear in 1 second
      $('#correctAnswer').empty(); // empty correct answer
      correctAnswers++;  // increment total # of correct answers
      timer.reset(); // reset timer
      timer.start(); // start timer
    } else {

      // if Answer is false
      setTimeout(function () {
        alert("Whoops! That was incorrect.");
      }, 1000);   // alert will disappear in 1 second
      $('#correctAnswer').html('<h3>The Correct Answer is: ' + rightAnswer + '</h3>'); // the correct answer will be shown.
      incorrectAnswers++;  //increment incorrect answers count
      timer.reset();  //reset timer
      timer.start();  //start timer
    }
  }

  // If no answer given and timer runs out
  if (timer.time === 0) {
    setTimeout(function () {
      alert("Sorry, you ran out of time!");
    }, 1000);  // alert will disappear in 1 second
    $('#correctAnswer').html('<h3>The Correct Answer is: ' + rightAnswer + '</h3>'); // the correct answer will be shown.
    unanswered++;  //increment unanswered count
    timer.reset();  //reset timer
    timer.start();  //start timer
  }
  setTimeout('nextQuestion()', 1000); // set time for next question to appear after 1 second
}

// Function to show Game Summary:
function gameSummary() {
  timer.reset(); // reset timer

  // If answer is less than or equal to 5
  if (correctAnswers <= 5) {
    $('#summary').html("<h1>Sorry, Try Again...Only: " + correctAnswers + "/10</h1>");
    $('#correctAnswers').html('<h3>Correct Answers: ' + correctAnswers + '</h3>');
    $('#incorrectAnswers').html('<h3>Incorrect Answers: ' + incorrectAnswers + '</h3>');
    $('#unanswered').html('<h3>Unanswered Questions: ' + unanswered + '</h3>');

  }
  // if answer is greater than 5
  else {
    $('#summary').html("<h1>Great Job! You Got: " + correctAnswers + "/10</h1>");
    $('#correctAnswers').html('<h3>Correct Answers: ' + correctAnswers + '</h3>');
    $('#incorrectAnswers').html('<h3>Incorrect Answers: ' + incorrectAnswers + '</h3>');
    $('#unanswered').html('<h3>Unanswered Questions: ' + unanswered + '</h3>');

  }
}
