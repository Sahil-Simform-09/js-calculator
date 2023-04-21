// get button & add event listner
const parentButton = document.querySelector(".buttons");
let inputString = "";

parentButton.addEventListener('click', handleClick);

// array of all type of functionallity in calculator
const basicOperator = ["+", "-", "÷", "*"];
const moderateOperator = ["mod", "(", ")", "π", "e"]
const number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const xTypefunction = ["^2", "√", "||", "e^", "^-1", "^", "10^","e", "log", "ln", "+/-","."];
const Trigonometry = ["sin", "cos", "tan", "nat", "nis", "soc"];
const memory = ["M+", "M-", "MS", "MR", "MC"];
let memoryStorage = [];

// DOM manipulation functions
const getclickedButtonId = function(event) {
    const clickedButton = event.target;
    if(clickedButton.id === "trigonometry") {
        return  document.querySelector("#trigonometry").value;
    }
    return clickedButton.id;
}
const getDisplay = function() {
    let input = document.querySelector(".question");
    let output = document.querySelector(".answer");

    return [input, output];
}
const showError = function(errMsg) {
    let output = getDisplay()[1];
    output.innerText = errMsg;
    output.style.color = "red";
}
const enableMemoryButton = function(buttons) {
    buttons.forEach(button => {
        button.style.cursor = "pointer";
        button.style.opacity = "1"
    }); 
}
const disableMemoryButton = function(buttons) {
    buttons.forEach(button => {
        button.removeEventListener("click", handleClick);
        button.style.cursor = "not-allowed";
        button.style.opacity = ".3" 
    }); 
}

// memory and validation functions
const validInput = function(inputMessage) {
    if(Number(inputMessage) !== NaN) {
        console.log(Number(inputMessage));
        return true;
    } 
    return false;
}
const validComputerString = function(givenString) {
    return  (givenString
            .replaceAll("mod", "%")
            .replaceAll("÷", "/")
            .replaceAll("π", "Math.PI")
            .replaceAll("e"," Math.E")
            .replaceAll("^", "**")
            .replaceAll("log", "Math.log10(")
            .replaceAll("ln", "Math.log(")
            .replaceAll("sin", "Math.sin(")
            .replaceAll("cos", "Math.cos(")
            .replaceAll("tan", "Math.tan(")
            .replaceAll("nis", "Math.asin(")
            .replaceAll("soc", "Math.acos(")
            .replaceAll("nat", "Math.atan("));
}
const validUserString = function(givenString) {
    return (givenString
        .replaceAll("log", "log(")
        .replaceAll("ln", "ln(")
        .replaceAll("sin", "sin(")
        .replaceAll("cos", "cos(")
        .replaceAll("tan", "tan(")
        .replaceAll("nis", "sin^-1(")
        .replaceAll("soc", "cos^-1(")
        .replaceAll("nat", "tan^-1("));
}  
const memoryOperation = function(clickedButtonId, input, output) {
    if(clickedButtonId === "MC") {
        memoryStorage = [];
    } else if(clickedButtonId === "MR") {
        if(memoryStorage.length > 0) {
           return memoryStorage[0] !== undefined ? memoryStorage[0] : 0;
        }
    } else if(clickedButtonId === "M+" || clickedButtonId === "M-" || clickedButtonId === "MS") {
        if(output.innerText.length > 0) {
            if(clickedButtonId === "MS") {    
                memoryStorage[0] = output.innerText;
            } else {
                let getValue = memoryStorage[0];
                memoryStorage[0] = eval(Number(output.innerText) + clickedButtonId.charAt(1) + getValue);
            }
        } else {
            showError("get answer first");
        }
    } 
}

// factorial functionality
const validFactString = function(factString) {
    let barackets = 0;
    let index = 0;
    for(let i = 0; i < factString.length; i += 1) {
        if(factString.charAt(i) === "(") {
            barackets += 1;
            index = i;
        } else if(factString.charAt(i) === ")") {
            barackets -= 1;
        }
    }

    return barackets === 0 ? [true, index] : [false, -1];
}
const getFact = function(inputString, index) {
    const getFactString = []; 
    let char = inputString.charAt(index - 1);
    let startIndex;

    if(number.includes(char)) {
        
        let i = index - 1;
        while(number.includes(char)) {
            i -= 1;
            char = inputString.charAt(i);
        }
        startIndex = i + 1;
        getFactString[0] = inputString.substring(i+1, index);
    } else if(char === ")") {

        let isValid = validFactString(inputString);
        if(isValid[0]) {
            getFactString[0] = eval(inputString.substring(isValid[1], index));
            startIndex = isValid[1];
        } else {
            showError("invalid input");
        }
    }

    getFactString[1] = startIndex;
    getFactString[2] = index;
    return [fact(Number(getFactString[0])).toString(), getFactString[1], getFactString[2]]; 
}
const fact = function(number) {
    let ans = 1;
    for(let i = 1; i <= number; i += 1) {
        ans *= i;
    }
    return ans;
}


let prevUserButton = [], prevComputerButton = [];
function handleClick(event) {

    let input = getDisplay()[0];
    let output = getDisplay()[1];

    let clickedButtonId = getclickedButtonId(event); 

    // remove error message
    if(output.style.color == "red") {
        output.innerText = "";
    }

    switch (clickedButtonId) {
        case "AC":
            inputString = output.innerText = input.innerText = ""; 
            break;

        case "clear":
            input.innerText = input.innerText.substring(0 ,input.innerText.length - prevUserButton.length);
            inputString = inputString.substring(0, inputString.length - prevComputerButton.length);

            break;

        case "=":
            try {
                let answer, answerString = inputString;           
                let n = inputString.length, i = 0;

                if(inputString.indexOf("!") !== -1) {
                    while(i < n) {
                        if(answerString.charAt(i) === "!") {
                            let factorial = getFact(answerString, i);
                            answerString = answerString.substring(0, factorial[1]) + factorial[0] + answerString.substring(factorial[2] + 1, answerString.length);
                            i = answerString.indexOf("!");
                            n = answerString.length;
                        } else {
                            i += 1;
                        }
                    }
                } else {
                    answerString = inputString
                }
                
                answer = eval(answerString);

                if(answer.toString() == "NaN") {
                    throw new Error("");
                }

                inputString = answer;
                input.innerText = output.innerText = inputString;
                prevUserButton = prevComputerButton = inputString;
                output.style.color = "black";

            } catch (error) {
                showError("Error");
            }
            break;

        case basicOperator.includes(clickedButtonId) || number.includes(clickedButtonId) || moderateOperator.includes(clickedButtonId)? clickedButtonId: false:
            const index = input.innerText.length - 1;
            if(basicOperator.includes(clickedButtonId) && basicOperator.includes(input.innerText.charAt(index))) {
                input.innerText = inputString.toString().slice(0, index) + clickedButtonId;
                inputString = inputString.toString().slice(0, index) + clickedButtonId;
            } else {
                
                inputString += validComputerString(clickedButtonId);
                prevComputerButton = validComputerString(clickedButtonId);
       
                input.innerText += clickedButtonId;
                prevUserButton = clickedButtonId;
            }
            break;
        
        case xTypefunction.includes(clickedButtonId) ? clickedButtonId: false:

            if(clickedButtonId === "√") {
                charArray = input.innerText.split("");
                charArray.unshift("√(");
                input.innerText = charArray.join("");
                inputString = "Math.sqrt(" + inputString;

                prevUserButton = "√(";
                prevComputerButton = inputString;

            } else if(clickedButtonId === "+/-") {
                if(output.innerText.length > 0) {
                    outputCharArray = output.innerText.split("");
                    computerCharArray = inputString.toString().split("");
                    userCharArray = input.innerText.split("");
                    if(outputCharArray[0] === "-") {
                        outputCharArray.shift();
                        computerCharArray.shift();
                        userCharArray.shift();
                    } else {
                        outputCharArray.unshift("-");
                        computerCharArray.unshift("-");
                        userCharArray.unshift("-");
                    }
                    output.innerText = outputCharArray.join("");
                    inputString = computerCharArray.join("");
                    input.innerText = userCharArray.join("");
                } else {
                    showError("get answer first");
                }

            } else if(clickedButtonId === "||") {
                input.innerText = "|" + input.innerText + "|";
                prevUserButton = input.innerText;

                inputString = "Math.abs(" + inputString + ")";
                prevComputerButton = input.innerText;
            } else {
                input.innerText += validUserString(clickedButtonId);
                prevUserButton = validUserString(clickedButtonId);

                inputString += validComputerString(clickedButtonId);
                prevComputerButton = validComputerString(clickedButtonId);
            }
            break;
        
        case Trigonometry.includes(clickedButtonId) ? clickedButtonId: false:
            input.innerText += validUserString(clickedButtonId);
            prevUserButton = validUserString(clickedButtonId);

            inputString += validComputerString(clickedButtonId);  
            prevComputerButton = validComputerString(clickedButtonId);
            break;  
        
        case memory.includes(clickedButtonId) ? clickedButtonId: false:
            let valFromMemory = memoryOperation(clickedButtonId, input, output);
            if(valFromMemory !== undefined) {
                inputString += valFromMemory;
                input.innerText += valFromMemory;
            }
            break;

        case "!":
            input.innerText += "!";
            prevUserButton = "!"; 

            inputString += "!";
            prevComputerButton = "!";
            break;
        default:
            break;
    }

    console.log(input.innerText);
    console.log(inputString);
    //eanble disable memory button
    if(memoryStorage.length > 0) {
        enableMemoryButton(document.querySelectorAll(".low-op-button"));
    } else {
        disableMemoryButton(document.querySelectorAll(".low-op-button"));
    }
}
