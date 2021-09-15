// ---------------------------------------------------
// This is for the greeting section
// ----------------------------------------------------
var today = new Date();
var hourNow = today.getHours();
var greeting;

if (hourNow < 12){
     greeting = 'Good Morning!';
} else if (hourNow >= 12 && hourNow <= 17) {
     greeting = 'Good Afternoon!';
} else if (hourNow >= 17 && hourNow <= 24) {
     greeting = 'Good Evening!';
} else {
     greeting = 'Welcome!';
}

var elGreetings = document.getElementById('greetings');
elGreetings.innerHTML = greeting;