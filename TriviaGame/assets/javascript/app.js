class TriviaQuestion {
    constructor(question, answers, correctAnswerIndex) {
        this.question = question;
        this.answers = answers;
        this.correctAnswerIndex = correctAnswerIndex;
    }
}

const triviaQuestions = [ new TriviaQuestion("What is the capital of Paraguay?", ["Asuncion", "Encarnacion", "Concepcion", "Ciudad del Este"], 0),
                    new TriviaQuestion("What is the largest South American country by area?", ["Peru", "Argentina", "Brazil", "Columbia"], 2),
                    new TriviaQuestion("The driest desert on earth is in South America. What is it's name?", ["La Guajira", "Atacma","Monte", "Patagonian"], 1),
                    new TriviaQuestion("Brazil borders all countries in South America except Ecuador and what other country?", ["Argentina", "Guyana", "Suriname","Chile"], 3),
                    new TriviaQuestion("Approximately how many kilometers high is the tallest peak of the Andes mountaing range?", ['6000', '5000', '7000', '999999'], 2),  
                    new TriviaQuestion("What is the largest island in South America?", ["Isla Grande de Tierra del Fuego", "Marajo", "Bananal Island", "Fiji"], 0)
];

var amountCorrect = 0;
var amountIncorrect = 0;
var amountUnanswered = 0;

var timecounter = 30;

// Create a trivia question form section (the question and radio button choices)
function createTriviaQuestionElement(triviaQuestion, number) {
    // Create div
    var div = $("<div>");
    // Display question
    var question = $("<h2>");
    question.text(triviaQuestion.question);
    question.appendTo(div);

    // For each answer, create input radio button and label
    for (var choiceNumber=0; choiceNumber < triviaQuestion.answers.length; choiceNumber++) {
        // Radio button
        var radioButton = $("<input>");
        radioButton.attr({
            type: 'radio',
            id: 'question' + number + 'choice' + choiceNumber,
            name: 'question' + number,
            value: triviaQuestion.answers[choiceNumber]
        });
        // Label
        var radioLabel = $("<label>");
        radioLabel.attr('for', radioButton.attr('id'));
        radioLabel.text(radioButton.attr('value'));

        radioButton.appendTo(div);
        radioLabel.appendTo(div);
    }

    return div;
}

// Look through the form, compare the answers and log how many are correct or incorrect (or unanswered)
function checkAnswers() {
    var form1 = document.querySelector("form");
    var data = new FormData(form1);
    // Iterate through form data
    for (const entry of data) {
        // console.log(entry);
        const radioName = entry[0];
        const radioValue = entry[1];
        // Get the question number out of radioName, which is a string like 'question0' or 'question13'
        //   To do this, get the portion of the string after the substring 'question', 
        //   then convert that to a number using parseInt()
        //   So, 'question7' becomes 7.
        const questionNumber = parseInt(radioName.slice('question'.length));
        // Access the corresponding TriviaQuestion object.
        const triviaQuestion = triviaQuestions[questionNumber];
        // Find the correct answer, using the correctAnswerIndex
        const correctAnswerIndex = triviaQuestion.correctAnswerIndex;
        const correctAnswer = triviaQuestion.answers[correctAnswerIndex];
        // console.log("Correct answer: " + correctAnswer);

        if (correctAnswer === radioValue) {
            amountCorrect++;
        }
        else {
            amountIncorrect++;
        }
    }
    // Calculate amount unanswered
    amountUnanswered = triviaQuestions.length - (amountCorrect+amountIncorrect);

    // Console log stuff
    console.log("Correct: " + amountCorrect);
    console.log("Incorrect: " + amountIncorrect);
    console.log("Unanswered: " + (triviaQuestions.length - (amountCorrect+amountIncorrect) ) );
    const linebreak = '-'.repeat(25);
    console.log(linebreak);
}

// Display the form with the questions
$(document).ready( function() {
    // Select the div #game-section
    const gameSection = $("#game-section");

    function displayStart() {
        // Create the start button
        var startButton = $("<button>");
        startButton.text("Start");
        startButton.appendTo(gameSection);
        // When clicked...
        startButton.on('click', function() {
            gameSection.empty();
            startQuiz();
        });
    }

    function startQuiz() {
        // Add a Time Remaining heading and a countdown timer
        // The code below is equal to this.
        // <h2>Time Remaining: <span id='time-remaining'></span> Seconds</h2>
        $("<h2>").html("Time Remaining: <span id='time-remaining'>" + timecounter + "</span> Seconds").appendTo(gameSection);
        // Set a countdown timer to display the time remaining and reduce it by 1, every 1 second.
        var countdownTimer = setInterval(function() {
            timecounter--;
            $("#time-remaining").html(timecounter);

            if (timecounter < 0) {
                clearInterval(countdownTimer);
                checkAnswers();
                displayResults();
            }
        }, 1000);

        // Create a form
        var form = $("<form>");
        form.appendTo(gameSection);
        // For each trivia question, create a trivia question div and append it to the form.
        for (var i=0; i<triviaQuestions.length; i++) {
            createTriviaQuestionElement(triviaQuestions[i], i).appendTo(form);
        }
    
        // Create a submit button and append to the form.
        var submitButton = $("<button>").attr('type', 'submit');
        submitButton.text('Done');
        submitButton.appendTo(form);
    
        // Submit Event Listener
        form.submit(function(event) {
            event.preventDefault();
            checkAnswers();
            displayResults();
        });
    }

    function displayResults() {
        gameSection.empty();
        // All done
        gameSection.append( $('<h2>').text('All Done!') );
        // correct answers, incorrect answers, unanswered
        gameSection.append( $('<h3>').text('Correct Answers:' + amountCorrect));
        gameSection.append( $('<h3>').text('Incorrect Answers:' + amountIncorrect));
        gameSection.append( $('<h3>').text('Unanswered:' + amountUnanswered));
    }

    displayStart();

});


