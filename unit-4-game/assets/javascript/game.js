$(document).ready(function() {

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
} 

var randomNumber = getRandomIntInclusive(19, 120);
var wins = 0;
var losses = 0;
var totalScore = 0;
var crystals = new Array(4);

function displayWins() {
    $("#wins").text(wins);
}

function displayLosses() {
    $("#losses").text(losses);
}

function displayRandomNumber() {
    $("#randomnumber").text(randomNumber);
}

function displayTotalScore() {
    $("#totalscore").text(totalScore);
}

$("#randomnumber").text(randomNumber);

function setCrystalValues () {
    for (var i=0; i<crystals.length; i++) {
        crystals[i] = getRandomIntInclusive(1, 12);
    }
}

setCrystalValues();
console.log("Crystals: " + crystals);

//on click, finding value of element 0 
// $("#ruby").on("click", function (){
//     totalScore += crystals[0];
//     $("#totalscore").text(totalScore);
//     console.log("test");
// });

$(".crystal").on("click", function (){
    console.log(this.id);
    // find the index of the crystal that was clicked on
    var allCrystals = Array.from( $(".crystal") );
    var index = allCrystals.indexOf(this);
    // add the value of the crystal with that index to the total score
    totalScore += crystals[index];
    // display total score
    $("#totalscore").text(totalScore);

    
    if (totalScore == randomNumber) {
        randomNumber = getRandomIntInclusive(19, 120);
        displayRandomNumber();
        setCrystalValues();
        wins += 1;
        displayWins();
        totalScore = 0;
        displayTotalScore();
    }

    else if (totalScore > randomNumber) {
        randomNumber = getRandomIntInclusive(19, 120);
        displayRandomNumber();
        setCrystalValues();
        losses += 1;
        displayLosses();
        totalScore = 0;
        displayTotalScore();
    }

})
































});