let displayContent = '0';
const displayWindow = document.querySelector(".display");
const savedDisplay = document.querySelector('.saved-display');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const clearButton = document.querySelector('.AC');
const deleteButton = document.querySelector('.DEL');
const decimalButton = document.querySelector('.decimal');
const equalsButton = document.querySelector('.equals');
let savedNumber = '';
let savedOperator = '';
let answerDisplayed = false;

function updateDisplay() {
    displayWindow.textContent = displayContent;
    savedDisplay.textContent = savedNumber + ' ' + savedOperator;
}

numberButtons.forEach(button => {button.addEventListener('click', () => {
    if (displayContent === "0" || answerDisplayed) {
        displayContent = button.textContent;
        updateDisplay();
        answerDisplayed = false;
    } else {
    displayContent += button.textContent;
    updateDisplay();
}}
        )
    }
);

operatorButtons.forEach(button => button.addEventListener('click', () => {
    if (!savedOperator) {
        savedNumber = displayContent;
        } else {
        savedNumber = calculate(savedNumber, savedOperator, displayContent);
        console.log(savedNumber);
    }
    switch (button.textContent) {
        case 'X':
            savedOperator = '*';
            displayContent = '0';
            updateDisplay();
            break;
        case '/':
            savedOperator = '/';
            displayContent = '0';
            updateDisplay();
            break;
        case '+':
            savedOperator = '+';
            displayContent = '0';
            updateDisplay();
            break;
        case '-':
            savedOperator = '-';
            displayContent = '0';
            updateDisplay();
            break;
    }})
)

clearButton.addEventListener('click', () => {
    displayContent = '0';
    resetDisplay()
})

deleteButton.addEventListener('click', () => {
    if (displayContent.length === 1) {
        displayContent = "0";
    } else {
        displayContent = displayContent.slice(0, displayContent.length-1);
    }  
    updateDisplay();
})

decimalButton.addEventListener('click', () => {
    if (!displayContent.includes('.')) {
        displayContent += '.';
        updateDisplay();
    }
})

equalsButton.addEventListener('click', () => operate(savedNumber, savedOperator,  displayContent));

function operate(num1, operator, num2) {
    if (savedNumber && savedOperator) {
            displayContent = calculate(num1, operator, num2)
            resetDisplay()
            answerDisplayed = true;
    }
}

function calculate(num1, operator, num2) {
    let answer = "0";
    switch (operator) {
        case "*":
            answer = parseFloat(num1) * parseFloat(num2);
            break;
        case "/":
            if (num2 === "0") {
                alert("Error! Can't divide by zero.");
            } else {
            answer = parseFloat(num1) / parseFloat(num2);
            }
            break;
        case "+":
            answer = parseFloat(num1) + parseFloat(num2);
            break;
        case "-":
            answer = parseFloat(num1) - parseFloat(num2);
            break;
    }
    answer = roundToTen(answer);
    return answer.toString();
}

function resetDisplay() {
    savedOperator = "";
    savedNumber = "";
    updateDisplay();
}

function roundToTen(num) {    
    return +(Math.round(num + "e+10")  + "e-10");
}
