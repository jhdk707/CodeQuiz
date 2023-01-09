const start_btn = document.querySelector(".start_btn button");
const rules_box = document.querySelector(".rules_box");
const exit_btn = document.querySelector(".rules_box + .buttons .exit");
const continue_btn = document.getElementById('continue-button');
const quiz_box = document.querySelector(".quiz_box");
const end_box = document.querySelector(".end_box");
const ans_opts = document.querySelector(".ans_opts");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const next_btn = document.querySelector(".quiz_box footer .next");
const bottom_ques_counter = document.querySelector(".quiz_box footer .total_que");
const restart_btn = document.getElementById('restart-button');
var quit_quiz = end_box.querySelector(".buttons .quit");

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

// Click Quit Quiz and Refresh 
quit_quiz.onclick = ()=> {
    window.location.reload();
}

//Click Next Button 
next_btn.addEventListener('click', () => {
  console.log('Next button was clicked');

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
        clearInterval(counterLine);
        showResult ();
    }
  });

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
function optionSelected(answer){
  clearInterval(counter); //clear counter
  clearInterval(counterLine); //clear counterLine
  let userAns = answer.textContent; //getting user selected option
  let correcAns = questions[que_count].answer; //getting correct answer from array
  const allOptions = ans_opts.children.length; //getting all option items
  
  if(userAns == correcAns){ //if user selected option is equal to array's correct answer
      userScore += 1; //upgrading score value with 1
      answer.classList.add("correct"); //adding green color to correct selected option
      answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
      console.log("Correct Answer");
      console.log("Your correct answers = " + userScore);
  }else{
      answer.classList.add("incorrect"); //adding red color to correct selected option
      answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
      console.log("Wrong Answer");
      for(i=0; i < allOptions; i++){
          if(ans_opts.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
              ans_opts.children[i].setAttribute("class", "option correct"); //adding green color to matched option
              ans_opts.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
              console.log("Auto selected correct answer.");
          }
      }
  }
  for(i=0; i < allOptions; i++){
      option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
  }
  next_btn.classList.add("show"); //show the next button if user selected any option
}
function showResult(){
  rules_box.classList.remove("activeInfo"); //hide info box
  quiz_box.classList.remove("activeQuiz"); //hide quiz box
  result_box.classList.add("activeResult"); //show result box
  const scoreText = result_box.querySelector(".score_text");
  if (userScore > 3){ // if user scored more than 3
      //creating a new span tag and passing the user score number and total question number
      let scoreTag = '<span>and congrats! , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
      scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
  }
  else if(userScore > 1){ // if user scored more than 1
      let scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
      scoreText.innerHTML = scoreTag;
  }
  else{ // if user scored less than 1
      let scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
      scoreText.innerHTML = scoreTag;
  }
}
function startTimer(time){
  counter = setInterval(timer, 1000);
  function timer(){
      timeCount.textContent = time; //changing the value of timeCount with time value
      time--; //decrement the time value
      if(time < 9){ //if timer is less than 9
          let addZero = timeCount.textContent; 
          timeCount.textContent = "0" + addZero; //add a 0 before time value
      }
      if(time < 0){ //if timer is less than 0
          clearInterval(counter); //clear counter
          timeText.textContent = "Time Off"; //change the time text to time off
          const allOptions = option_list.children.length; //getting all option items
          let correcAns = questions[que_count].answer; //getting correct answer from array
          for(i=0; i < allOptions; i++){
              if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                  option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                  option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                  console.log("Time Off: Auto selected correct answer.");
              }
          }
          for(i=0; i < allOptions; i++){
              option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
          }
          next_btn.classList.add("show"); //show the next button if user selected any option
      }
  }
}
function startTimerLine(time){
  counterLine = setInterval(timer, 29);
  function timer(){
      time += 1; //upgrading time value with 1
      time_line.style.width = time + "px"; //increasing width of time_line with px by time value
      if(time > 549){ //if time value is greater than 549
          clearInterval(counterLine); //clear counterLine
      }
  }
}
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