// --------------------------------------------------------------
// This is for the greeting section
// --------------------------------------------------------------
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

var elGreetings = document.getElementById('greet');
elGreetings.innerHTML = greeting;

// --------------------------------------------------------------
// Selection of Elements
// --------------------------------------------------------------
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Class Names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST = []
     , id = 0;

// Showing Today's Date
const options = {
     weekday : 'long',
     month: 'short',
     day: 'numeric'
};

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// Adding ToDo function
function addToDo (toDo, id, done, trash) {
     if (trash) {
          return;
     }

     const DONE = done ? CHECK : UNCHECK;
     const LINE = done ? LINE_THROUGH : "";

     const item = `
          <li class="item">
          <i class="fas ${DONE}" job="complete" id=${id}></i>
          <p class="text ${LINE}>">${toDo}</p>
          <i class="far fa-trash-alt" job="delete" id=${id}></i>
          </li>
     `;
     
     const position = "beforeend";
     list.insertAdjacentHTML(position, item);
}

// Adding an item to the list when the user presses enter
document.addEventListener('keyup', function(even) {
     if (event.keyCode == 13) {
          const toDo =  input.value;
          // if th input isn't empty
          if (toDo){
               addToDo(toDo, id, false, false);

               LIST.push({
                    name : toDo,
                    id : id,
                    done : false,
                    trash : false
               });

               id++;
          }
          input.value = "";
     }
});

addToDo ('Head', 1, false, true);

// For when the user clicks on the add button to complete his entry of todo
function completeTodo (element) {
     element.classList.toggle (CHECK);
     element.classList.toggle (UNCHECK);
     element.parentNode.querySelector(".text").classList.toggle (LINE_THROUGH);

     LIST [element.id].done = LIST [element.id].done ? false : true;
}

// For the item to disappear into bin when the bin bucket is click
function removeToDo (element) {
     element.parentNode.parentNode.removeChild(element.parentNode);
     LIST[element.id].trash = true;
}

// To target the items created dynamically
list.addEventListener("click", function(event) {
     const element = event.target; //return the clicked element into the list
     const elementJob = element.attributes.job.value; //complete or delete

     if (elementJob == "complete") {
          completeTodo(element);
     } else if (elementJob == "delete") {
          removeToDo(element);
     }
})