// script.js

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let operator = null;
let operand1 = null;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    handleInput(button.getAttribute("data-key"));
  });
});

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (
    !isNaN(key) ||
    ["+", "-", "*", "/", ".", "Enter", "Backspace", "Escape"].includes(key)
  ) {
    handleInput(key === "Enter" ? "=" : key === "Escape" ? "C" : key);
  }
});

function handleInput(input) {
  if (!isNaN(input) || input === ".") {
    currentInput += input;
    display.value = currentInput;
  } else if (["+", "-", "*", "/"].includes(input)) {
    operator = input;
    operand1 = parseFloat(currentInput);
    currentInput = "";
  } else if (input === "=") {
    if (operator && currentInput !== "") {
      const operand2 = parseFloat(currentInput);
      currentInput = calculate(operand1, operator, operand2).toString();
      display.value = currentInput;
      operator = null;
      operand1 = null;
    }
  } else if (input === "C") {
    currentInput = "";
    operator = null;
    operand1 = null;
    display.value = "";
  } else if (input === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  }
}

function calculate(operand1, operator, operand2) {
  switch (operator) {
    case "+":
      return operand1 + operand2;
    case "-":
      return operand1 - operand2;
    case "*":
      return operand1 * operand2;
    case "/":
      return operand1 / operand2;
    default:
      return 0;
  }
}
