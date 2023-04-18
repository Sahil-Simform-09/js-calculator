
// add onclick eventlister
const getButtons = function() {
    const buttons = document.querySelectorAll(".button");
    return buttons;
}
const addEventListener = function() {
    let buttons = getButtons();
    buttons.forEach( button => {
        button.addEventListener('click', handleClick);
    });
}

// main calculator logic
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

const operatorNumber = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "÷", "mod", "*", "(", ")", "π", "e"];
const xTypefunction = ["**2", "**1/2", "||", "e**", "**-1", "**", "10**"];

function validString(givenString) {
    return  (givenString
            .replaceAll("mod", "%")
            .replaceAll("÷", "/")
            .replaceAll("π", Math.PI)
            .replaceAll("e", Math.E));
}
let inputString = "";

function handleClick(event) {

    let input = getDisplay()[0];
    let output = getDisplay()[1];

    let clickedButtonId = getclickedButtonId(event); 
    switch (clickedButtonId) {
        case "AC":
            input.innerText = ""; 
            output.innerText = "";
            inputString = "";
            break;

        case "clear":
            input.innerText = input.innerText.slice(0, input.innerText.length - 1);
            inputString = inputString.slice(0, inputString.length - 1);
            break;

        case "=":
            try {
                let answer = eval(inputString);
                inputString = answer;
                input.innerText = "(" + input.innerHTML + ")";
                output.innerText = answer;
                output.style.color = "black";

            } catch (error) {
                showError("invalid input");
            }
            break;

        case operatorNumber.includes(clickedButtonId) ? clickedButtonId: false:
            inputString += validString(clickedButtonId);
            console.log(inputString);
            input.innerText += clickedButtonId;
        
        case xTypefunction.includes(clickedButtonId) ? clickedButtonId: false:

            let ePowOrtenPow = clickedButtonId.substring(clickedButtonId.length - 2, clickedButtonId.length);
            if(ePowOrtenPow === "**" && clickedButtonId.length > 2) {
                input.innerText += clickedButtonId.slice(0,-2) + "^";
                if(clickedButtonId.slice(0,-2) === "e") {
                    inputString += "2.718282**";
                } else {
                    inputString += clickedButtonId;
                }

            } else if(clickedButtonId === "**" || clickedButtonId === "**2"  || clickedButtonId === "**1/2" || clickedButtonId === "||" || clickedButtonId === "e**") {
                if(input.innerText.length > 0) {
                    switch (clickedButtonId) {
                        case "**":
                            if(validInput(inputString)) {
                                input.innerText += "^";
                                inputString += clickedButtonId;
                            } else {
                                showError("invalid input");
                            }               
                            break;
                        case "**2":
                            if(validInput(inputString)) {
                                input.innerText += "^2";
                                inputString += clickedButtonId;
                            } else {
                                showError("invalid input");
                            }
                            break;
                        case "**1/2":
                            charArray = input.innerText.split("");
                            charArray.unshift("√(");
                            charArray.push(")");
                            input.innerText = charArray.join("");
                            inputString = "Math.sqrt(" + inputString + ")";
                            break;
                        case "||":
                            inputString = "Math.abs(" + inputString + ")";
                            innput.innerText = "|" + input.innerText + "|";
                        default:
                            break;
                    }   
                } else {
                    showError("provide input first");
                }
            } else if(clickedButtonId === "**-1") {
                if(input.innerText.length === 0){
                    input.innerText += "1/";
                    inputString += "1/";
                } else {
                    showError("invalid input");
                }
            } else {}
            break;
        default:
            break;
    }
}