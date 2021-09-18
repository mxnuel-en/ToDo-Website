// --------------------------------------------------------------
// This is for the greeting section
// --------------------------------------------------------------
var today = new Date();
var hourNow = today.getHours();
var greeting;

if (hourNow < 12){
     greeting = 'Good Morning!';
} else if (hourNow >= 12 && hourNow < 16) {
     greeting = 'Good Afternoon!';
} else if (hourNow >= 16 && hourNow < 24) {
     greeting = 'Good Evening!';
} else {
     greeting = 'Welcome!';
}

var elGreetings = document.getElementById('greet');
elGreetings.innerHTML = greeting;

// Showing Today's Date
const dateElement = document.getElementById("date");
const options = {
     weekday : 'long',
     month: 'short',
     day: 'numeric'
};

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// --------------------------------------------------------------
// Selection of Elements
// --------------------------------------------------------------
const inputBox = document.querySelector (".inputField input");
const addBtn = document.querySelector (".inputField button");
const todoList = document.querySelector (".todolist");
const deleteAllBtn = document.querySelector (".clear button");

inputBox.onkeyup = () => {
     let userData = inputBox.value; //getting user entered value
     if (userData.trim() != 0) { //if user values aren't only spaces
          addBtn.classList.add ("active"); //activate the add button
     } else{
          addBtn.classList.remove ("active"); //unactivate the add button
     }
}

showTasks(); //calling showTasks function

// if user clicks on the button
addBtn.onclick = ()=> {
     let userData = inputBox.value;
     let getLocalStorage = localStorage.getItem ("New Todo"); //getting local storage
     if (getLocalStorage == null){//if local storage is null
          listArr = []; //creating blank array
     } else {
          listArr = JSON.parse (getLocalStorage);
     }
     listArr.push(userData); //pushing or adding user data
     localStorage.setItem ("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
     showTasks(); //calling showTasks function
     addBtn.classList.remove("active");
}

// function to add task list inside ul
function showTasks() {
     let getLocalStorage = localStorage.getItem("New Todo"); //Getting local storage
     if (getLocalStorage == null) {//if local storage is null
          listArr = []; //creating a blank array
     } else {
          listArr = JSON.parse (getLocalStorage); //transforming json string into a js object
     }

     const pendingNumb = document.querySelector (".task-no");
     pendingNumb.textContent = listArr.length; //passing the length value pending number

     if (listArr.length > 0) {
          deleteAllBtn.classList.add ("active"); //activate the clear all button
     }else {
          deleteAllBtn.classList.remove ("active"); //deactivate the clear all button
     }

     let newLiTag = '';
     listArr.forEach((element, index) => {
          newLiTag += `<li> ${element} <span onclick = "deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;          
     });
     todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
     inputBox.value = ""; //Once the task has been added, leave the input field blank
}

// delete task function
function deleteTask(index) {
     let getLocalStorage = localStorage.getItem ("New Todo");
     listArr = JSON.parse (getLocalStorage);
     listArr.splice(index, 1); //delete or remove the particular indexed li
     // after removing the li again, update the local Storage
     localStorage.setItem ("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
     showTasks(); //calling showTasks function
}

// deleting all tasks function
deleteAllBtn.onclick = () => {
     listArr = []; //empty an array
     //After removing alll tasks again, update the local storage
     localStorage.setItem ("New Todo", JSON.stringify(listArr)); //transforming js object into json string
     showTasks(); //calling show tasks function
}