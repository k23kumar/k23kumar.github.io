// Initialize Firebase
var config = {
    apiKey: "AIzaSyAw2-1QA0C1uDRjSwdKTlSscrE-TwZtsOw",
    authDomain: "train-schedule-12518.firebaseapp.com",
    databaseURL: "https://train-schedule-12518.firebaseio.com",
    projectId: "train-schedule-12518",
    storageBucket: "",
    messagingSenderId: "62100105764"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var ref = database.ref();

  var trains = [];



$("#add-train").on("click", function(event){
    event.preventDefault();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    var train = {
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    };
    console.log(train);
    ref.push(train);
});
 
$(document).ready(function() {
    // Get each train object from Firebase, put it our array, trains.
    // Before doing that, give the train object the properties 'nextTrainTime'
    // and 'minutesAway'
    ref.on("child_added", function(snapshot) {
        var train = snapshot.val();

        // Find the nextTrainTime by setting it to the firstTrain time and increasing
        // it by number of minutes of its frequency, until we get to a time that is
        // equal to or later than the current time.
        var tFrequency = train.frequency;
        var firstTime = train.firstTrain;
        var nextTrainTime = moment(firstTime, "HH:mm");
        
        while (nextTrainTime < moment()) {
            nextTrainTime.add(tFrequency, 'minutes');
        }

        train["nextTrainTime"] = nextTrainTime;
        // The minutesAway is the difference in minutes between now and the nextTrainTime.
        var minutesAway = moment(nextTrainTime).diff(moment(), 'minutes');
        train["minutesAway"] = minutesAway;
        console.log(train);

        // Add train to trains array
        trains.push(train);
        // Create a table row with the appropriate properties, and append it.
        var tr = createTableRow(train);
        $("tbody").append(tr);
    });

    // Set an interval to check each train object every 60 seconds,
    // update nextTrainTime (if necessary), and update the minutesAway property.
    // Then refresh the table.
    var myInterval = setInterval(function() {
        for (train of trains) {
            // Update nextTrainTime
            while (train.nextTrainTime < moment()) {
                train.nextTrainTime.add(train.frequency, 'minutes');
            }

            // Update minutesAway
            train.minutesAway = moment(train.nextTrainTime).diff(moment(), 'minutes');
        }

        // Clear the table body
        $("tbody").empty();
        // Create and append the table rows of train
        for (train of trains) {
            var tr = createTableRow(train);
            $("tbody").append(tr);
        }
    }, 1000 * 60);

});

// Create a table row of train data, from a train object.
function createTableRow(train) {
    // Create an array of train data, in the order it will be displayed in the table.
    var array = [train.destination, train.frequency, train.nextTrainTime.format('HH:mm'), train.minutesAway];
    var tr = $("<tr>");
    for (element of array) {
        var td = $("<td>");
        td.html(element);
        td.appendTo(tr);
    }
    return tr;
}