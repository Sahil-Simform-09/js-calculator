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

// validate input for user and computer
function validComputerString(givenString) {
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
function validUserString(givenString) {
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

// DOM manipulation functions
const getclickedButtonId = function(event) {
    const clickedButton = event.target;
    let isSvgOrPath =  clickedButton instanceof SVGElement || clickedButton instanceof SVGPathElement;  // check clicked button is SVG or path
    
    if(isSvgOrPath) {
        return clickedButton.parentElement.id;
    } else {
        if(clickedButton.id === "trigonometry") {
            return  document.querySelector("#trigonometry").value;
        } else {
            return clickedButton.id;
        }
    }
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

// calculator logic functions
const validInput = function(inputMessage) {
    if(Number(inputMessage) !== NaN) {
        console.log(Number(inputMessage));
        return true;
    } 
    return false;
}
const validFactString = function(factString) {
    let barackets = 0;
    let index = 0;
    for(let i = 0; i < factString.length; i += 1) {
        if(factString.charAt(i) === "(") {
            barackets += 1;
            index = 1;
        } else if(factString.charAt(i) === ")") {
            barackets -= 1;
        }
    }

    return barackets === 0 ? [true, index] : [false, -1];
}
const memoryOperation = function(clickedButtonId, input, output) {
    if(clickedButtonId === "MC") {
        memoryStorage = [];
    } else if(clickedButtonId === "MR") {
        if(memoryStorage.length > 0) {
            inputString += input.innerText += memoryStorage[0];
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
const fact = function(number) {
    let ans = 1;
    for(let i = 1; i <= number; i += 1) {
        ans *= i;
    }
    return ans;
}

function handleClick(event) {

    let input = getDisplay()[0];
    let output = getDisplay()[1];

    let clickedButtonId = getclickedButtonId(event); 

    // clear output screen
    output.innerText = "";

    switch (clickedButtonId) {
        case "AC":
            inputString = output.innerText = input.innerText = ""; 
            break;

        case "clear":
            input.innerText = input.innerText.slice(0, input.innerText.length - 1);
            inputString = inputString.slice(0, inputString.length - 1);
            break;

        case "=":
            try {
                let answer, answerString;
                const getFactString = [];            

                if(inputString.indexOf("!") !== -1) {
                    let index = inputString.indexOf("!");
                    let char = inputString.charAt(index - 1);

                    if(number.includes(char)) {
                        
                        let i = index - 1;
                        while(number.includes(char)) {
                            i -= 1;
                            char = inputString.charAt(i);
                        }
                        getFactString[0] = inputString.substring(i+1, index);
                        getFactString[1] = i;
                        getFactString[2] = index;
                    } else if(char === ")") {

                        let isValid = validFactString(inputString)[0];
                        if(isValid[0]) {
                            getFactString = eval(inputString.substring(isValid[1], index));
                        } else {
                            showError("invalid input");
                        }
                    }

                    let factorial = fact(getFactString[0]).toString();
                    answerString = inputString.substring(0, getFactString[1] + 1) + factorial + inputString.substring(getFactString[2] + 1, inputString.length);
                } else {
                    answerString = inputString
                }
                
                console.log(answerString);
                answer = eval(answerString);

                if(answer.toString() == "NaN") {
                    throw new Error("");
                }

                inputString = answer;
                output.innerText = inputString;
                input.innerText = output.innerText;
                output.style.color = "black";

            } catch (error) {
                console.log(error);
                showError("Error");
            }
            break;

        case basicOperator.includes(clickedButtonId) || number.includes(clickedButtonId) || moderateOperator.includes(clickedButtonId)? clickedButtonId: false:
            const index = input.innerText.length - 1;
            if(basicOperator.includes(clickedButtonId) && basicOperator.includes(input.innerText.charAt(index))) {
                input.innerText = inputString = inputString.toString().slice(0, index) + clickedButtonId;
            } else {
                
                inputString += validComputerString(clickedButtonId);
                input.innerText += clickedButtonId;
            }
            break;
        
        case xTypefunction.includes(clickedButtonId) ? clickedButtonId: false:

            if(clickedButtonId === "√") {
                charArray = input.innerText.split("");
                charArray.unshift("√(");
                input.innerText = charArray.join("");
                inputString = "Math.sqrt(" + inputString;

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
                inputString = "Math.abs(" + inputString + ")";
            } else {
                input.innerText += validUserString(clickedButtonId);
                inputString += validComputerString(clickedButtonId);
            }
            break;
        
        case Trigonometry.includes(clickedButtonId) ? clickedButtonId: false:
            input.innerText += validUserString(clickedButtonId);
            inputString += validComputerString(clickedButtonId);  
            break;  
        
        case memory.includes(clickedButtonId) ? clickedButtonId: false:
            memoryOperation(clickedButtonId, input, output);
            break;

        case "!":
            input.innerText += "!";
            inputString += "!";
            break;
        default:
            break;
    }

    //eanble disable memory button
    if(memoryStorage.length > 0) {
        enableMemoryButton(document.querySelectorAll(".low-op-button"));
    } else {
        disableMemoryButton(document.querySelectorAll(".low-op-button"));
    }
}
