const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.querySelector('.clear');

// calculate first and second values
const calculate = {
  '/': (firstNum, secondNum) => firstNum / secondNum,
  '*': (firstNum, secondNum) => firstNum * secondNum,
  '+': (firstNum, secondNum) => firstNum + secondNum,
  '-': (firstNum, secondNum) => firstNum - secondNum,
  '=': (firstNum, secondNum) => secondNum,
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === '0' ? number : displayValue + number;
  }
}

function addDecimal() {
  // If operator pressed, don't press decimal
  if (awaitingNextValue) return;
  // if no decimal add one
  const displayValue = calculatorDisplay.textContent;
  if (!displayValue.includes('.')) {
    calculatorDisplay.textContent = displayValue + '.';
  }
}

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  // assign first value if not assigned already
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  // Ready for next valur, store operator
  awaitingNextValue = true;
  operatorValue = operator;
}

// Reset all display and values
function resetAll() {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDisplay.textContent = '0';
}

inputBtns.forEach((btn) =>
  btn.addEventListener('click', () => {
    if (btn.classList.length === 0) {
      btn.addEventListener('click', sendNumberValue(btn.value));
    } else if (btn.classList.contains('operator')) {
      btn.addEventListener('click', useOperator(btn.value));
    } else if (btn.classList.contains('decimal')) {
      btn.addEventListener('click', addDecimal());
    }
  })
);

clearBtn.addEventListener('click', resetAll);
