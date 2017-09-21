  // Initialize Firebase
var config = {
    apiKey: "AIzaSyB4RQtE4ZJspkO_5JTRlhyn7mIQYQI9Q9U",
    authDomain: "rock-paper-scissors-4448d.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-4448d.firebaseio.com",
    projectId: "rock-paper-scissors-4448d",
    storageBucket: "rock-paper-scissors-4448d.appspot.com",
    messagingSenderId: "193539860791"
  };

firebase.initializeApp(config);

var database = firebase.database();

// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");
var choiceSubField = database.ref("/connections/choice");
// '.info/connected' is a special location provided by Firebase that is updated
// every time the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");
// When the client's connection state changes...
connectedRef.on("value", function(snap) {
  // If they are connected..
  if (snap.val()) {
    // Add user to the connections list.
    var con = connectionsRef.push(true);
    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});
// When first loaded or when the connections list changes...
connectionsRef.on("value", function(snap) {
  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  console.log(snap.numChildren());
});

var compArray = ["R", "P", "S"];
var random ="";
var choice = "";
var userChoice = "";


$(document).keypress(function(e){

	database.ref("/connections/choice").remove();

	random = Math.floor(Math.random()*3);
	var	compChoice = compArray[random];
	console.log("computer choice is " +compChoice);

	if (e.which===82 || e.which=== 114) {
		userChoice = "R";
		// console.log("choice is " + choice);
	}

	else if (e.which===80 || e.which === 112) {
		userChoice = "P";
		// console.log("choice is " + choice);
	}

	else if (e.which === 83 || e.which === 115) {
		userChoice = "S";
		// console.log("choice is " + choice);
	}

	database.ref("/connections/choice").push(userChoice);

	database.ref("/connections/choice").on("child_added", function(childSnapshot, prevChildKey){
		choice = childSnapshot.val();

	});

	console.log(choice);

	if (choice ==="S" &&  compChoice==="R") {
		console.log("you lose!");
	}

	if (choice ==="S" &&  compChoice==="P") {
		console.log("you win!");
	}

	if (choice ==="S" &&  compChoice==="S") {
		console.log("you tie!");
	}

	if (choice ==="R" &&  compChoice==="R") {
		console.log("you tie!");
	}

	if (choice ==="R" &&  compChoice==="P") {
		console.log("you lose!");
	}

	if (choice ==="R" &&  compChoice==="S") {
		console.log("you win!");
	}

	if (choice ==="P" &&  compChoice==="R") {
		console.log("you win!");
	}

	if (choice ==="P" &&  compChoice==="P") {
		console.log("you tie!");
	}

	if (choice ==="P" &&  compChoice==="S") {
		console.log("you lose!");
	}	
			
});
