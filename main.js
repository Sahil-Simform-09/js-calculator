const parentButton = document.querySelector(".buttons");
let inputString = "";

parentButton.addEventListener('click', function handleClick(event) {

    let input = getDisplay()[0];
    let output = getDisplay()[1];

    let clickedButtonId = getclickedButtonId(event); 

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
                let answer = eval(inputString);              
                let answerString = answer.toString();
                const dotIndex = answerString.split("").indexOf(".");

                if(answer.toString() == "NaN") {
                    throw new Error("");
                }
                if(dotIndex !== -1) {
                    answer = trimOutput(answerString, dotIndex);
                }

                inputString = answer;
                output.innerText = inputString;
                input.innerText = output.innerText;
                output.style.color = "black";

            } catch (error) {
                showError("invalid input");
            }
            break;

        case operator.includes(clickedButtonId) || number.includes(clickedButtonId) ? clickedButtonId: false:
            const index = input.innerText.length - 1;
            if(operator.includes(clickedButtonId) && operator.includes(input.innerText.charAt(index))) {
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
                    showError("provide input");
                }

            } else {
                input.innerText += validUserString(clickedButtonId);
                inputString += validComputerString(clickedButtonId);
            }
            break;
        
        case Trigonometry.includes(clickedButtonId) ? clickedButtonId: false:
            input.innerText += validUserString(clickedButtonId);
            inputString += validComputerString(clickedButtonId);    
        
        case memory.includes(clickedButtonId) ? clickedButtonId: false:
            memoryOperation(clickedButtonId);
        default:
            break;
    }
    
});

const operator = ["+", "-", "÷", "mod", "*", "(", ")", "π", "e"];
const number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const xTypefunction = ["^2", "√", "||", "e^", "^-1", "^", "10^","e", "log", "ln", "+/-","."];
const Trigonometry = ["sin", "cos", "tan", "nat", "nis", "soc"];
const memory = ["M+", "M-", "MS", "MR", "MC"];
let memoryStorage = [];

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
const trimOutput = function(inputMessage, index) {
    return inputMessage.slice(0, index + 5);
}

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
const validInput = function(inputMessage) {
    if(Number(inputMessage) !== NaN) {
        console.log(Number(inputMessage));
        return true;
    } 
    return false;
}

const memoryOperation = function(clickedButtonId) {
    if(clickedButtonId === "MC") {
        memoryStorage = [];
    } else if(clickedButtonId === "MR") {
        input.innerText += memoryStorage[0] !== undefined ? memoryStorage[0] : 0;
    } else if(clickedButtonId === "M+" || clickedButtonId === "M-" || clickedButtonId === "MS") {
        if(output.innerText.length > 0) {
            if(clickedButtonId === "MS") {
                memoryStorage[0] = output.innerText;
            } else {
                let getValue = memoryStorage[0];
                memoryStorage[0] = eval(Number(output.innerText) + clickedButtonId.charAt(1) + getValue);
            }
        } else {
            showError("provide input");
        }
    } 
}