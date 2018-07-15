// Initialize Firebase
var config = {
  apiKey: "AIzaSyDgOesQELNWRy-gta8VVnNKeviWBO3sl6U",
  authDomain: "humansvszombies2.firebaseapp.com",
  databaseURL: "https://humansvszombies2.firebaseio.com",
  projectId: "humansvszombies2",
  storageBucket: "humansvszombies2.appspot.com",
  messagingSenderId: "715968868977"
};
firebase.initializeApp(config);



var database = firebase.database();
var registration = database.ref("/registration/")


database.ref().on("value", function(snapshot) {
});


/*var registrationIdentity;
function IDgen(){
  registrationIdentity = Math.floor(Math.random*1000000);
  //check to ensure ID does not already exist in database
  database.forEach(IDnumber => {
    if(registrationIdentity == IDnumber){
      IDgen();
    }
  });
}*/

// $("#registrationSubmitBtn").on("click", function() {
$("#loginRegisterBtn").on("click", function() {
  event.preventDefault();
  console.log("test");
  var registrationUsername = $("#userNameInput").val().trim();
  var registrationPassword = $("#passwordInput").val().trim();
  //function (declared above) that generates ID for Tag function
  var registrationIdentity = Math.floor(Math.random()*1000000);

  var registrationIsAlive = true;

  database.ref("/registration").once('value').then(function(snapshot) {
    // Check the number of registered users
    var numUsers = snapshot.numChildren();
    // Every fourth person is a zombie
    if ( (numUsers % 4) === 0 ) {
      registrationIsAlive = false;
    }
  
    var registrationObject = {
      username: registrationUsername,
      password: registrationPassword,
      IDnumber: registrationIdentity,
      isAlive: registrationIsAlive
    };
    localStorage.setItem("playerID", registrationIdentity);
    localStorage.setItem("alive",  registrationObject.isAlive);
    $("#statsDiv").html("Your player ID is: "+ localStorage.getItem("playerID"));
    // alert("test");

    database.ref("/registration/").push(registrationObject);
    window.location.replace("game.html");
    
  });
});
 
$("#loginSubmitBtn").on("click", function() {
  event.preventDefault();

  var username = $("#userNameInput").val().trim(); 
  var password = $("#passwordInput").val().trim();
  
  database.ref("/registration/").once("value").then(function(snapshot) {
    registration = snapshot.val();
    for (let key in registration) {
      if (registration[key].username === username && registration[key].password === password) {
        sessionStorage.clear();
        sessionStorage.setItem("username", username);

        window.location.replace("joinGame.html");

      }
      else {
        $("#userNameInput").val("");
        $("#passwordInput").val("");
      }
    }
  });
  
    
});

$("#createGameSubmitBtn").on("click", function() {
  event.preventDefault();

  var gameName = $("#gameNameInput").val().trim();
  var gameLocation = $("#gameLocationInput").val().trim();
  var startDate = $("#gameStartDateInput").val().trim();
  var endDate = $("#gameEndDateInput").val().trim();

  console.log(gameName);

  var newGameObject = {
    gameName: gameName,
    gameLocation: gameLocation,
    startDate: startDate,
    endDate: endDate,
  }

  var newgame =  database.ref("/games").push(newGameObject);

  window.location.replace("joinGame.html");

})


