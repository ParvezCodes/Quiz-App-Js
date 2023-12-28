const startBtn = document.querySelector(".start__btn button");
const infoBox = document.querySelector(".info__box");
const exitBtn = infoBox.querySelector(".buttons .exit");
const continueBtn = document.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz__box");
const nextBtn = quizBox.querySelector(".next__btn");
const optionList = document.querySelector(".option__list");
const timeCount = quizBox.querySelector(".timer__sec");
const timeLine = quizBox.querySelector("header .time__line");
const resultBox = document.querySelector(".result_box");
const restartQuiz = resultBox.querySelector(".buttons .restart");
const exitQuiz = resultBox.querySelector(".buttons .exit");
const timeOff = quizBox.querySelector(".time__text");

// if start  button clicked
startBtn.addEventListener("click", () => {
  infoBox.classList.add("activeInfo"); //show info__box
});

// if exit button clicked
exitBtn.addEventListener("click", () => {
  infoBox.classList.remove("activeInfo"); //hide info__box
});

// if continue button clicked
continueBtn.addEventListener("click", () => {
  infoBox.classList.remove("activeInfo"); //hide info__box
  quizBox.classList.add("activeQuiz"); //show quiz__box

  showQuestions(0);
  queCounter(1);
  startTimer(10);
  startTimerLine(0);
});

exitQuiz.onclick = () => {
  window.location.reload();
};

restartQuiz.onclick = () => {
  resultBox.classList.remove("activeResult");
  quizBox.classList.add("activeQuiz");

  let queCount = 0;
  let queNumb = 1;
  let timeValue = 10;
  let widthValue = 0;
  let userScore = 0;

  showQuestions(queCount);
  queCounter(queNumb);
  clearInterval(counter);
  startTimer(timeValue);
  clearInterval(counterLine);
  startTimerLine(widthValue);
  nextBtn.style.display = "none";
  timeOff.textContent = "Time";
};

let queCount = 0;
let queNumb = 1;
let counter;
let counterLine;
let timeValue = 10;
let widthValue = 0;
let userScore = 0;

// if next button click for next question
nextBtn.onclick = () => {
  if (queCount < questions.length - 1) {
    queCount++;
    queNumb++;
    showQuestions(queCount);
    queCounter(queNumb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    nextBtn.style.display = "none";
    timeOff.textContent = "Time";
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    console.log("Question Completed");
    showResultBox();
  }
};

// get question and option from array
function showQuestions(index) {
  const queText = document.querySelector(".quiz__text");
  let queTag =
    `<span>` +
    questions[index].numb +
    " . " +
    questions[index].question +
    `</span>`;
  let optionTag =
    `<div class="option">` +
    questions[index].options[0] +
    `<span></span></div>` +
    `<div class="option">` +
    questions[index].options[1] +
    `<span></span></div>` +
    `<div class="option">` +
    questions[index].options[2] +
    `<span></span></div>` +
    `<div class="option">` +
    questions[index].options[3] +
    `<span></span></div>`;

  // set question and array

  queText.innerHTML = queTag;
  optionList.innerHTML = optionTag;

  const option = optionList.querySelectorAll(".option");

  //   set onclick attribute to every option
  // and then option is clicked then call optionSelected fun and pass the clicked option
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

let tickIcon = ` <div class="icon tick"><i class="fa-solid fa-circle-check"></i></div>`;
let crossIcon = `<div class="icon cross"><i class="fa-solid fa-circle-xmark"></i></div>`;

function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);

  // recieve clicked option here and get textContent of option
  let userAns = answer.textContent;
  let correctAns = questions[queCount].answer;
  const allOption = optionList.children.length;

  if (userAns == correctAns) {
    answer.classList.add("correct");
    console.log("correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
    userScore += 1;
    console.log(userScore);
  } else {
    answer.classList.add("inCorrect");
    console.log("wrong");
    answer.insertAdjacentHTML("beforeend", crossIcon);

    // if answer is wrong then automatically select correct ans
    for (let i = 0; i < allOption; i++) {
      if (optionList.children[i].textContent == correctAns) {
        optionList.children[i].setAttribute("class", "option correct");
        optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
      }
    }
  }

  //   once user select one option then disable other all option
  for (let i = 0; i < allOption; i++) {
    optionList.children[i].classList.add("disabled");
  }

  nextBtn.style.display = "block";
}

function queCounter(index) {
  const bottom_Que_Counter = quizBox.querySelector(".total__que");
  let total_Que_CounterTag =
    `<span><p>` +
    index +
    `</p>of<p>` +
    questions.length +
    `</p>Questions</span>`;

  bottom_Que_Counter.innerHTML = total_Que_CounterTag;
}

function startTimer(time) {
  counter = setInterval(timer, 1000);

  function timer() {
    timeCount.textContent = time;
    time--;

    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }

    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
      timeOff.textContent = "Time off";

      let correctAns = questions[queCount].answer;
      const allOption = optionList.children.length;

      for (let i = 0; i < allOption; i++) {
        if (optionList.children[i].textContent == correctAns) {
          optionList.children[i].setAttribute("class", "option correct");
          optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
        }
      }

      for (let i = 0; i < allOption; i++) {
        optionList.children[i].classList.add("disabled");
      }

      nextBtn.style.display = "block";
    }
  }
}

function startTimerLine() {
  const maxWidth = 498;
  const timeLimit = 10 * 1000; // Convert 10 seconds to milliseconds

  let time = 0;
  const timeIncrement = maxWidth / timeLimit;

  // Set up an interval to call the timer function every 29 milliseconds
  const counterLine = setInterval(timer, 29);

  function timer() {
    // Increment the time variable by 29 milliseconds
    time += 29;

    // Calculate the width based on the time increment
    const width = time * timeIncrement;

    // Update the width of an element with the id 'timeLine'
    timeLine.style.width = width + "px";

    // Check if the width exceeds the maximum width
    if (width > maxWidth) {
      // If so, clear the interval (stop the timer)
      clearInterval(counterLine);
    }
  }
}

function showResultBox() {
  infoBox.classList.remove("activeInfo"); //hide info__box
  quizBox.classList.remove("activeQuiz"); //show quiz__box
  resultBox.classList.add("activeResult"); //show resultBox

  const scoreText = resultBox.querySelector(".score_text");
  let scoreTag =
    `<span>You got <p>` +
    userScore +
    `</p>out of<p>` +
    questions.length +
    `</p></span>`;
  scoreText.innerHTML = scoreTag;
}
