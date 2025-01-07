const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");

// Function to convert decimal to binary recursively
const decimalToBinary = (input) => {
    if (input === 0 || input === 1) {
      return String(input);
    } else {
      return decimalToBinary(Math.floor(input / 2)) + (input % 2);
    }
  };
  
  // Function to generate dynamic animation data based on the input
  const generateAnimationData = (input) => {
    let data = [];
    let currentInput = input;
    let delayIncrement = 500; // Base delay for each step
  
    // Create animation data for each recursive call
    while (currentInput > 1) {
      data.push({
        inputVal: currentInput,
        addElDelay: delayIncrement,
        msg: `decimalToBinary(${currentInput}) returns "${Math.floor(currentInput / 2)}" + ${currentInput % 2} 
        (${currentInput} % 2) and continues.`,
        showMsgDelay: delayIncrement + 4000,
        removeElDelay: delayIncrement + 8000,
      });
      currentInput = Math.floor(currentInput / 2);
      delayIncrement += 1000; // Increase delay for the next step
    }
  
    // Add base case for when input becomes 1
    data.push({
      inputVal: currentInput,
      addElDelay: delayIncrement,
      msg: `decimalToBinary(${currentInput}) returns '${currentInput}' (base case)`,
      showMsgDelay: delayIncrement + 4000,
      removeElDelay: delayIncrement + 8000,
    });
  /*The reverse() method is necessary to ensure the animation correctly represents the recursive process, 
  where the initial call comes first, and the base case comes last*/
    return data.reverse(); 
  };
  
  // Function to show animation based on generated animation data
  const showAnimation = (animationData, inputValue) => {
    //animationData is the data array with objects and the inputValue is the input  
    result.innerText = "Call Stack Animation";
  
    animationData.forEach((obj) => {
      // Step 1: Add the animation frame after the specified delay
      setTimeout(() => {
        animationContainer.innerHTML += `
          <p id="${obj.inputVal}" class="animation-frame">
            decimalToBinary(${obj.inputVal})
          </p>
        `;
      }, obj.addElDelay);
  
      // Step 2: Update the message content after the specified delay
      setTimeout(() => {
        const element = document.getElementById(obj.inputVal);
        if (element) { // Check if element exists before trying to update it
          element.textContent = obj.msg;
        }
      }, obj.showMsgDelay);
  
      // Step 3: Remove the animation frame after the specified delay
      setTimeout(() => {
        const element = document.getElementById(obj.inputVal);
        if (element) { // Check if element exists before trying to remove it
          element.remove();
        }
      }, obj.removeElDelay);
    });
  
    // Display the final binary result after all animations complete
    setTimeout(() => {
      result.textContent = `Binary Result: ${decimalToBinary(inputValue)}`;
      animationContainer.innerHTML = ""; // Optionally clear the animation container
    }, animationData[animationData.length - 1].removeElDelay + 1000);
  };
  
  
  // Function to validate input and trigger animation
  const checkUserInput = () => {
    const inputInt = parseInt(numberInput.value);
  
    if (!inputInt || isNaN(inputInt) || inputInt < 0) {
      alert("Please provide a decimal number greater than or equal to 0");
      return;
    }
  
    // Generate dynamic animation data for any input
    const animationData = generateAnimationData(inputInt);
    showAnimation(animationData, inputInt);
  
    // Clear the input field after displaying the animation 
    numberInput.value = "";
  };
  
  // Event listeners for button click and Enter key press
  convertBtn.addEventListener("click", checkUserInput);
  numberInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      checkUserInput();
    }
  });
  