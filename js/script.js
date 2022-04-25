const infoBox = document.querySelector(".infoBox");
const quizBox = document.querySelector(".quizBox");
const resultBox = document.querySelector(".resultBox");
const optionList = document.querySelector(".optionList");
const getHintButton = document.querySelector(".getHint");
const continueButton = infoBox.querySelector(".buttons .restart");
const nextButton = document.querySelector("footer .nextButton");
const restartButton = resultBox.querySelector(".buttons .restart");

let gotHint = false
let hintsTaken = 0
let currentQuestion = 0;
let quizScore = 0;

getHintButton.onclick = () => {
    if (!gotHint) {
        gotHint = true;
        hintsTaken += 1;
        document.querySelector(".hintCounter").innerHTML = 'Hints taken: ' + hintsTaken;
        document.querySelector(".hintHolder").innerHTML = '<img src="questionHints/question' + currentQuestion + 'Img.webp" alt="question ' + currentQuestion + '" width="200" height="80">'
    }
}

infoBox.classList.add("activeInfo");


continueButton.onclick = ()=>{
    infoBox.classList.remove("activeInfo");
    quizBox.classList.add("activeQuiz"); 
    showQuestion(0);
}




nextButton.onclick = () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion); 
        nextButton.classList.remove("show");
    } else {
        showResult(); 
    }
}

restartButton.onclick = ()=>{
    quizBox.classList.add("activeQuiz");
    resultBox.classList.remove("activeResult");
    gotHint = false
    document.querySelector(".hintHolder").innerHTML ='Quiz Thingy'
    hintsTaken = 0
    currentQuestion=0
    quizScore = 0;
    showQuestion(currentQuestion);
    nextButton.classList.remove("show");
}





function showQuestion(index) {

    document.querySelector(".questionText").innerHTML = '<span>' + (index + 1) + ". " + questions[index].question + '</span>';
    optionList.innerHTML = '<div class="option"><span>'+ questions[index].options[0] +'</span></div><div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div><div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    
    const options = optionList.querySelectorAll(".option");
    for(i=0; i < options.length; i++){
        options[i].setAttribute("onclick", "optionSelected(this)");
    }

    gotHint = false
    document.querySelector(".hintHolder").innerHTML = 'Quiz Thingy'
    document.querySelector(".hintCounter").innerHTML = 'Hints taken: ' + hintsTaken;
    document.querySelector(".questionImage").innerHTML = '<img src="questionImages/question' + index + 'Img.webp" alt="question ' + index + '" width="500" height="300">'
    document.querySelector("footer .questionCounterText").innerHTML = '<span><p>' + (index + 1) + '</p>/<p>' + questions.length + '</p> </span>'
}


function optionSelected(answer){
    if (answer.textContent == questions[currentQuestion].options[questions[currentQuestion].answer]) {
        quizScore += 1;
        answer.classList.add("correct")
    }else{
        answer.classList.add("incorrect");
        optionList.children[questions[currentQuestion].answer].setAttribute("class", "option correct");
    }
    for (i = 0; i < optionList.children.length; i++){
        optionList.children[i].classList.add("disabled");
    }
    nextButton.classList.add("show")
}

function showResult(){
    infoBox.classList.remove("activeInfo");
    quizBox.classList.remove("activeQuiz");
    resultBox.classList.add("activeResult");


    resultBox.querySelector(".scoreText").innerHTML = '<span>' + quizScore + '/' + questions.length + ' Questions Right</span>';
    resultBox.querySelector(".hintsText").innerHTML=hintsTaken+' hints'
}


