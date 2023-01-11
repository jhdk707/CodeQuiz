const start_btn = document.querySelector(".start_btn button");
const rules_box = document.querySelector(".rules_box");
const exit_btn = document.querySelector(".rules_box footer button.exit");
const continue_btn = document.querySelector('.footer .buttons .continue');
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".end_box");
const ans_opts = document.querySelector(".ans_opts");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const next_btn = document.querySelector(".quiz_box footer .next");
const bottom_ques_counter = document.querySelector(".quiz_box footer .bottom_ques_counter");
const restart_btn = document.querySelector(".restart");
var quit_quiz = result_box.querySelector(".buttons .quit");
let timeValue = 60;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
let intervalId;
let allOptions = document.querySelectorAll('.ans_opts div');



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
  answer: "True or False Statement",
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

// Click on Start Button
start_btn.onclick = ()=> {
  console.log("start button clicked"); 
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
  startTimer(timeValue);
  startTimerLine(0);
}

// Timer Function
function startTimer(timeValue){
  counter = setInterval(timer, 1000);
  function timer(){
      timeCount.textContent = timeValue; //changing the value of timeCount with time value
      timeValue--; //decrement the time value
      if(timeValue < 9){ //if timer is less than 9
          let addZero = timeCount.textContent; 
          timeCount.textContent = "0" + addZero; //add a 0 before time value
      }
      if (timeValue <= 0) {
        clearInterval(counter);
        timeCount.textContent = "0";
        // logic for game over
      }
          for(i=0; i < allOptions; i++){
              ans_opts.children[i].classList.add("disabled"); //once user select an option then disabled all options
          }
          next_btn.classList.add("show"); //show the next button if user selected any option
      }
  }


function startTimerLine(timeValue){
  counterLine = setInterval(timer, 29);
  function timer(){
      timeValue += 1; //upgrading time value with 1
      time_line.style.width = timeValue + "px"; //increasing width of time_line with px by time value
      if(timeValue > 549){ //if time value is greater than 549
          clearInterval(counterLine); //clear counterLine
      }
  }
}

// When Restart is clicked 
restart_btn.onclick = ()=>{
    console.log("restart button clicked")
    quiz_box.classList.add("activeQuiz");
    end_box.classList.remove("activeResult");
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


//Click Next Button 
next_btn.addEventListener('click', () => {
    console.log('Next button was clicked');
  
      if (que_count === questions.length - 1){
          clearInterval(counter);
          clearInterval(counterLine);
          showResults ();
      } else {
          que_count++;
          que_numb++;
          showQuestions(que_count);
          queCounter(que_numb);
          timeText.textContent = "Time Left";
          next_btn.classList.remove("show");
      }
  });
  
  let question = questions[index].question;
//Display Questions Options from Array
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");

    //Make new window          
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = `
    <div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>
  `;
    que_text.innerHTML = que_tag; 
    ans_opts.innerHTML = option_tag; 

    const option = ans_opts.querySelectorAll(".option");
    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
    option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// insert functions here
//if user clicked on option
function optionSelected(answer) {
  let userAns = answer.textContent; //getting user selected option
  let correcAns = questions[que_count].answer; //getting correct answer from array
  const allOptions = ans_opts.children.length; //getting all option items

  if (userAns === correcAns) { //if user selected option is equal to array's correct answer
    userScore += 1; //upgrading score value with 1
    answer.classList.add("correct"); //adding green color to correct selected option
    console.log("Correct Answer");
    console.log("Your correct answers = " + userScore);
  } else {
    answer.classList.add("incorrect"); //adding red color to correct selected option
    console.log("Wrong Answer");

    for (let i = 0; i < allOptions; i++) {
      if (ans_opts.children[i].textContent === correcAns) {
        ans_opts.children[i].classList.add("correct");
      }
    }

    // Decrement the timer by 10 seconds
    let newTime = parseInt(timeCount.textContent) - 10;
    if (newTime < 0) {
      newTime = 0;
    }
    timeCount.textContent = newTime;
  }

  for (let i = 0; i < allOptions; i++) {
    ans_opts.children[i].classList.add("disabled"); //once user select an option then disabled all options
  }
  next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResults(){
if(que_count == questions.length) {
  quiz_box.classList.remove("activeQuiz");
  result_box.classList.add("activeResults");
  showResults();
  clearInterval(counter);
} else {
    que_count++;
}};


function queCounter(index){
  //creating a new span tag and passing the question number and total question
  let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
  bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}


//
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