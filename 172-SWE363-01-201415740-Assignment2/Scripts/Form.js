var nameRegx = /^[a-zA-Z -']+$/;
var emailRegx= /^\w+@[a-zA-Z]+\.[a-zA-Z]/;
var score;
var question_counter = 1;

//This function return true if the user entered currect name and email and starts the exam with the timer.
function validateForm(){
    var nameValue = document.getElementById('thisName').value;
    var emailValue = document.getElementById('thisEmail').value;
    var nameTest = nameRegx.test(nameValue);
    var emailTest = emailRegx.test(emailValue);
    if(nameTest && emailTest){
        //Time function where the exam time starts right after validation success
        document.getElementById("validate").classList.add("validated");
        document.getElementById("question_section_container").classList.remove("ifValidatedShow");
        document.getElementById("Question1Timer").classList.remove("ifValidatedShow");
        return true;
    }
    else{
        if(!nameTest && !emailTest)
            alert("wrong name and email formats.");
        else if(!nameTest)
            alert("Wrong name format.");
        else if(!emailTest)
            alert("Wrong email format");
        return false;
    } 
}

//Leaving the page confirm
function leavePage(){
    var result = confirm("Leave the page? the exam will be stoped.");
    return result;
}
window.onbeforeunload = function() { return "Your work will be lost."; };


//Exam Timer (not complete)
//Display time format as min:sec
var count = 0;
function convertSeconds(s){
    var min = Math.floor(s/60);
    var sec = s % 60;
    return min + ':' + sec;
}


//Print time on screen and do a countdown, at 0 go to next question group
var setTimer;
function setup(timeAmountAllowed, elementID, currentQuestionGroup, nextQuestionGroup){
    if(!(timeAmountAllowed-count < 1)){
        var myElement = document.getElementById(elementID);
        myElement.innerHTML = convertSeconds(timeAmountAllowed-count);
    }
    function timer(){
        count++;
        if(timeAmountAllowed-count < 1){
            myElement.innerHTML = "Time is up.";
            nexnextQuestionGroup(currentQuestionGroup, nextQuestionGroup);
            clearInterval(setTimer);
        }
        else {
            myElement.innerHTML = convertSeconds(timeAmountAllowed-count);
        }
    }
    if(!(timeAmountAllowed-count < 1) && typeof setTimer != 'number'){
        setTimer = setTimeout(timer, 1000);
    }
}

//Questions and Questions Group Navigation methods
function changeQuestion(event, question){
    var divContent = document.getElementsByClassName("contents");
    var contentButtons = document.getElementsByClassName("questionButton");
    for(var i = 0; i < divContent.length; i++){
        divContent[i].classList.add('questionGroupHide');
    }

    for (i = 0; i < contentButtons.length; i++) {
        contentButtons[i].className = contentButtons[i].className.replace(" active", "");
    }
    document.getElementById(question).classList.remove('questionGroupHide');
    event.currentTarget.className += " active";
}

function nextQuestionGroup(currentQuestionGroup, nextQuestionGroup){
    var current = document.getElementById(currentQuestionGroup).classList.add('questionGroupHide');
	var next = document.getElementById(nextQuestionGroup).classList.remove('questionGroupHide');
}

//Calculating exams points methods (not complete)
function examResults(){
    var questionOneMaxPoints = 5;
    var questionTwoMaxPoints = 6;
    var questionThreeMaxPoints = 10;

    var questionOneEarnedPoints;
    var questionTwoEarnedPoints;
    var questionThreeEarnedPoints;
}

//Dragable for question three
function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

//Exam End Submit Button Function
function examEndPage(){
    window.location.replace("examEnd.html");
}