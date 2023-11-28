let firstNumber = undefined;
let operator;
let secondNumber = 0;

let result;

let number = [];
let operatorCopy;

//math

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => {
  if (b === 0) {
    return 0;
  }
  return a * b;
};
const divide = (a, b) => {
  if (b === 0) {
    return "ERROR: Can't divide by 0. Press C to restart.";
  }
  return a / b;
};

//update display

const operationElement = document.querySelector(".operation");
const operationHistoryElement = document.querySelector(".operation-history");

function display() {
  if (!operator) {
    operationHistoryElement.innerHTML = ``;
  }
  operationElement.innerHTML = number;
  if (result !== undefined) {
    operationHistoryElement.innerHTML = `${result}${operator}`;
  }
  li;
}

//input

function pushData(num) {
  const isValidNumber = (num) => {
    // Check if num is a string and contains more than one decimal point
    if (typeof num === "string" && num.split(".").length - 1 > 1) {
      // If there are multiple decimal points, remove all but the first one
      const parts = num.split(".");
      return Number(parts[0] + "." + parts.slice(1, parts.length).join(""));
    }
    return Number(num);
  };
  if (num.length === 0) {
    num = [0];
  }
  if (firstNumber === undefined) {
    firstNumber = isValidNumber(num);
  } else {
    firstNumber = result;
    secondNumber = isValidNumber(num);
  }
}
(function getUserInput() {
  const buttons = document.querySelectorAll(".btn");
  let button;

  function removeTransition(e3) {
    if (e3.propertyName === "background-color") {
      this.classList.remove("pressed");
    }
    return;
  }

  document.addEventListener("keydown", (e4) => {
    e4.preventDefault();
    button = document.querySelector(`.btn[data-code="${e4.code}"]`);
    onUserAction(e4.code);
  });

  buttons.forEach((element) => {
    element.addEventListener("transitionend", removeTransition);
    element.addEventListener("click", () => {
      button = element;
      onUserAction(button.getAttribute("data-code"));
    });
  });
  function onUserAction(eventcode) {
    button.classList.add("pressed"); //add background

    switch (eventcode) {
      // Handle digit keys (0-9)
      case "Digit1":
      case "Numpad1":
      case "Digit2":
      case "Numpad2":
      case "Digit3":
      case "Numpad3":
      case "Digit4":
      case "Numpad4":
      case "Digit5":
      case "Numpad5":
      case "Digit6":
      case "Numpad6":
      case "Digit7":
      case "Numpad7":
      case "Digit8":
      case "Numpad8":
      case "Digit9":
      case "Numpad9":
      case "Digit0":
      case "Numpad0":
        number += eventcode[eventcode.length - 1]; // Extract the digit from the event code
        display();
        break;
      //Operators
      case "NumpadAdd":
      case "Equal":
        operator = "+";
        pushData(number); //validates and saves the string
        operate();
        display();
        break;
      case "NumpadSubtract":
      case "Minus":
        operator = "-";
        pushData(number);
        operate();
        display();
        break;
      case "NumpadMultiply":
      case "NumpadStar":
        operator = "*";
        pushData(number);
        secondNumber = secondNumber === 0 ? 1 : secondNumber;
        operate();
        display();
        break;
      case "NumpadDivide":
      case "Slash":
        operator = "/";
        pushData(number);
        secondNumber = secondNumber === 0 ? 1 : secondNumber;
        operate();
        display();
        break;
      //special
      case "KeyC":
        clearData();
        clearScreen();
        break;
      case "NumpadEnter":
      case "Enter":
        operator = "";
        pushData(number);
        operate();
        display();
        number = result;
        firstNumber = undefined;
        secondNumber = 0;
        break;
      case "NumpadDecimal":
      case "Period":
        number += ".";
        display();
        break;
      case "Delete":
      case "Backspace":
        number = number.slice(0, -1);
        display();
      default:
        break;
    }
  }
})(); //self call

//operations

function operate() {
  if (operatorCopy) {
    doMath(operatorCopy);
    operatorCopy = operator;
  } else {
    operatorCopy = operator;
    doMath(operator);
  }

  function doMath(x) {
    switch (x) {
      case "+":
        result = add(firstNumber, secondNumber);
        break;
      case "-":
        result = subtract(firstNumber, secondNumber);
        break;
      case "*":
        result = multiply(firstNumber, secondNumber);
        break;
      case "/":
        result = divide(firstNumber, secondNumber);
        break;
    }
    number = [];
  }
}

function clearData() {
  firstNumber = undefined;
  operator = undefined;
  secondNumber = 0;
  result = undefined;
  number = [];
  operatorCopy = undefined;
  operator = undefined;
}

function clearScreen() {
  operationHistoryElement.innerHTML = "";
  operationElement.innerHTML = "";
}

//menu
(function menu() {
  const menuItems = document.querySelectorAll(".menu-item");
  const contentParagraphs = Array.from(
    document.querySelectorAll(".page-content")
  );
  const paragraphIdsToShow = ["home", "about", "contact"];
  //hide all except first
  contentParagraphs.forEach((paragraph, index) => {
    if (index !== 0) {
      paragraph.style.display = "none";
    }
  });
  //when menu item is clicked paragraph shows
  menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", (e) => {
      const clickedItemId = e.target.id.replace("menu-", "");
      if (paragraphIdsToShow.includes(clickedItemId)) {
        const selectedParagraph = contentParagraphs.find(
          (paragraph) => paragraph.id === clickedItemId
        );

        if (selectedParagraph) {
          contentParagraphs.forEach((paragraph) => {
            paragraph.style.display =
              paragraph.id === clickedItemId ? "block" : "none";
          });
        }
      }
    });
  });
})();
