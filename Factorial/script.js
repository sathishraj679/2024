const inputNumber = document.getElementById("number-input");
const submitBtn = document.getElementById("submit-btn");
const outputContainer = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");

const factorial = (input) => {
  if (input === 0 || input === 1) {
    return 1;
  } else {
    return input * factorial(input - 1);
  }
};

const generateAnimation = (input) => {
  let dataStackArray = [];
  let currentInput = input;
  let delayIncrement = 1000;

  while (currentInput > 1) {
    dataStackArray.push({
      inputVal: currentInput,
      addElDelay: delayIncrement,
      msg: `factorial(${currentInput}) returns "${currentInput} * factorial(${currentInput - 1})" and continues.`,
      showMsgDelay: delayIncrement + 4000,
      removeElDelay: delayIncrement + 8000,
    });
    currentInput--;
    delayIncrement += 1000;
  }

  // Base case when input becomes 1
  dataStackArray.push({
    inputVal: currentInput,
    addElDelay: delayIncrement,
    msg: `factorial(${currentInput}) returns ${currentInput} (base case).`,
    showMsgDelay: delayIncrement + 4000,
    removeElDelay: delayIncrement + 8000,
  });

  return dataStackArray.reverse();
};

const showAnimation = (dataStackAnimation, inputValue) => {
  outputContainer.innerHTML = "Animation Flow";

  dataStackAnimation.forEach((obj) => {
    setTimeout(() => {
        animationContainer.innerHTML += `
          <p id="${obj.inputVal}" class="animation-frame">
            factorial(${obj.inputVal})
          </p>
        `;
      }, obj.addElDelay);

    setTimeout(() => {
      const element = document.getElementById(`${obj.inputVal}`);
      if (element) {
        element.textContent = obj.msg;
      }
    }, obj.showMsgDelay);

    setTimeout(() => {
      const element = document.getElementById(`${obj.inputVal}`);
      if (element) {
        element.remove();
      }
    }, obj.removeElDelay);
  });

  setTimeout(() => {
    outputContainer.textContent = `Factorial: ${factorial(inputValue)}`;
    animationContainer.innerHTML = "";
  }, dataStackAnimation[dataStackAnimation.length - 1].removeElDelay+1000);
};

const checkUserInput = () => {
  const inputInt = parseInt(inputNumber.value);
  if (inputInt < 0 || isNaN(inputInt)) {
    alert("Please enter a valid positive integer.");
  } else {
    const dataStackAnimation = generateAnimation(inputInt);
    showAnimation(dataStackAnimation, inputInt);
  }
};

submitBtn.addEventListener("click", checkUserInput);

inputNumber.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});

  
