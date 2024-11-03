function add(num1, num2)
{
    return num1 + num2;
}

function subtract(num1, num2)
{
    return num1 - num2;
}

function multiply(num1, num2)
{
    return num1 * num2;
}

function divide(num1, num2)
{
    return num1 / num2;
}

function operate(operator, num1, num2)
{
    if (operator === '+')
    {
        return add(num1, num2);
    }
    else if (operator === '-')
    {
        return subtract(num1, num2);
    }
    else if (operator === '*')
    {
        return multiply(num1, num2);
    }
    else if (operator === '/')
    {
        return divide(num1, num2);
    }
    else
    {
        console.log("Idk how u got here");
        return;
    }
}

const container = document.querySelector("#buttons_container");

const buttonColors = [
    "gray", 'gray', 'gray', 'green',
    'cornflowerblue', 'cornflowerblue', 'cornflowerblue', 'green',
    'cornflowerblue', 'cornflowerblue', 'cornflowerblue', 'green',
    'cornflowerblue', 'cornflowerblue', 'cornflowerblue', 'green',
    'cornflowerblue', 'cornflowerblue', 'cornflowerblue', 'green'
];

const buttonLabels = [
    "AC", '+/-', '%', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '', '.', '='
];

let counter = 0;

for (let i = 0; i < 5; i++)
{
    const newFlex = document.createElement("div");
    newFlex.display = "flex";
    for (let j = 0; j < 4; j++)
    {
        const newButton = document.createElement("button");
        if (buttonLabels[counter] === "")
        {
            counter++;
            continue;
        }
        
        newButton.id = `Button${buttonLabels[counter]}`;
        newButton.textContent = buttonLabels[counter];
        newButton.className = "calc_button";
        newButton.style.background = buttonColors[counter];

        if (buttonLabels[counter] === "0")
        {
            newButton.classList.add("big_button");
        }

        counter++;
        newFlex.append(newButton);
    }
    container.append(newFlex);
}

const displayContainer = document.querySelector("#display_container");
let currentInput = "";
let operator = null;
let operand1 = null;

const buttons = document.querySelectorAll(".calc_button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (!isNaN(value) || value === ".") 
        { 
            currentInput += value;
            displayContainer.textContent = currentInput;
        } 
        else if (value === "AC") 
        { 
            currentInput = "";
            operand1 = null;
            operator = null;
            displayContainer.textContent = "0";
        } 
        else if (value === "=") 
        {  // Equals button
        if (operator && operand1 !== null && currentInput)
        {
            const result = operate(operator, operand1, parseFloat(currentInput));
            displayContainer.textContent = result;
            operand1 = result;
            currentInput = "";
            operator = null;
        }
        } 
        else
        { 
            if (currentInput) 
            {
                operand1 = parseFloat(currentInput);
                operator = value;
                currentInput = "";
                displayContainer.textContent = operator;
            }
        }
    });
});
