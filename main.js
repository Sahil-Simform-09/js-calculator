const parentButton = document.querySelector(".buttons");
let inputString = "";

parentButton.addEventListener('click', function handleClick(event) {

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

                console.log(answer);
                if(answer.toString() == "NaN") {
                    console.log(" tert ");
                    throw new Error("");
                }

                input.innerText = "(" + input.innerHTML + ")";
                output.innerText = answer;
                output.style.color = "black";

            } catch (error) {
                showError("invalid input");
            }
            break;

        case operatorNumber.includes(clickedButtonId) ? clickedButtonId: false:
            inputString += validComputerString(clickedButtonId);
            input.innerText += clickedButtonId;
            break;
        
        case xTypefunction.includes(clickedButtonId) ? clickedButtonId: false:

            if(clickedButtonId === "√") {
                charArray = input.innerText.split("");
                charArray.unshift("√(");
                charArray.push(")");
                input.innerText = charArray.join("");
                inputString = "Math.sqrt(" + inputString + ")";
                console.log(inputString);
                break;
            } else {
                input.innerText += validUserString(clickedButtonId);
                inputString += validComputerString(clickedButtonId);
            }
            break;

        default:
            break;
    }
    
});

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
const xTypefunction = ["^2", "√", "||", "e^", "1/", "^", "10^","e"];

function validComputerString(givenString) {
    return  (givenString
            .replaceAll("mod", "%")
            .replaceAll("÷", "/")
            .replaceAll("π", "Math.PI")
            .replaceAll("e"," Math.E")
            .replaceAll("^", "**"));
}
function validUserString(givenString) {
    return givenString;   
}

