const start_btn = document.querySelector(".start_btn button");
const rules_box = document.querySelector(".rules_box");
const exit_btn = rules_box.querySelector(".buttons .exit");
const continue_btn = rules_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const ans_opts = document.querySelector(".ans_opts");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");
var restart_quiz = result_box.querySelector ("buttons .restart");
var quit_quiz = result_box.querySelector("buttons .quit");


// Click on Start Button
start_btn.onclick = ()=> {
    rules_box.classList.add("activeInfo");
}

// Click on Exit Button
exit_btn.onclick = ()=> {
    rules_box.classList.remove("activeInfo");
}

// Click Continue Quiz Button
continue_btn.onclick = ()=> {
    rules_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(60);
    startTimerLine(0);
}

let timeValue = 60;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

// When Restart is clicked 
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    timeValue = 60;
    que_count = 0;
    que_numb = 0;
    userScore = 0;
    widthValue =0;
    showQuestions (que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show");
}

// Click Quit Quiz and Refresh 
quit_quiz.onclick = ()=> {
    window.location.reload();
}

//Click Next Button 
next_btn.onclick = ()=> {
    if (que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval (counter);
        clearInterval (counterLine);
        startTimer(timeValue)
        startTimerLine(widthValue);
        timeText.textContent = "Time Left";
        next_btn.classList.remove("show");
    }else{
        clearInterval(counter);
        clearInterval(counterLine):
        showResult ();
    }
}

//Display Questions Options from Array
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");

    //Make new window          
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; 

    const option = ans_opts.querySelectorAll(".option");
    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
    option[i].setAttribute("onclick", "optionSelected(this)");
    }
}



// Questions Array 
let questions = [
    {
    numb: 1,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "How To Mail Letter",
      "Hyper Text Markup Language",
      "Hard Test Maker List",
      "Hyper Tool Multi Language"
    ]
  },
    {
    numb: 2,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheet",
    options: [
      "Color Selector Sheet",
      "Cascading Style Selectors",
      "Computer Style Sheet",
      "Cascading Style Sheet"
    ]
  },
    {
    numb: 3,
    question: "What does JavaScript do?",
    answer: "Runs Scripting language to animate and control your pages",
    options: [
      "Makes you Coffee and writes a movie ",
      "Runs Scripting language to animate and control your pages",
      "Wakes up your Computer",
      "Makes the backbone of your webpage"
    ]
  },
    {
    numb: 4,
    question: "What is == as an Operator?",
    answer: "Equal To",
    options: [
      "Equal Value",
      "Equal To",
      "Greater Than",
      "Less than or Equal To"
    ]
  },
    {
    numb: 5,
    question: "What is a BooLean?",
    answer: "True or False",
    options: [
      "True or False Statement",
      "Switch Statement",
      "While Loop",
      "Block Scope"
    ]
  },

  {
    numb: 6,
    question: "What is a GitHub?",
    answer: "Hosting Website for Repositories",
    options: [
      "a Website to get CSS Color Palettes from",
      "Font Hosting Website",
      "Hosting Website for Repositories",
      "a Random Password Generator"
    ]
  },
];








  // question template
  //   {
  //   numb: X,
  //   question: "Blank",
  //   answer: "Correct answer",
  //   options: [
  //     "Option 1",
  //     "option 2",
  //     "option 3",
  //     "option 4"
  //   ]
  // },