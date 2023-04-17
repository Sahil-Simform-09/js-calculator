
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
const reduceButtonSize = function(event) {
    const clickedButton = document.getElementById(getclickedButtonId(event));
    
    clickedButton.style.border = '5px solid black';
    clickedButton.style.boxSizing = 'border-box'
}

const operatorNumber = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "/", "mod", "*", "(", ")"];
let inputString = "";
function handleClick(event) {

    // reduceButtonSize(event);
    let input = document.querySelector(".question");
    let output = document.querySelector(".answer");
    
    let clickedButtonId = getclickedButtonId(event); 
    switch (clickedButtonId) {
        case "AC":
            input.innerText = ""; 
            output.innerText = "";
            inputString = "";
            break;

        case "clear":
            console.log(input.innerText + " " + clickedButtonId);
            input.innerText = input.innerText.slice(0, input.innerText.length - 1);
            inputString = inputString.slice(0, inputString.length - 1);
            break;

        case "=":
            let answer = eval(inputString);
            inputString = answer;
            input.innerHTML = "(" + input.innerHTML + ")";
            console.log(answer);
            output.innerText = answer;
            break;

        case operatorNumber.includes(clickedButtonId) ? clickedButtonId: false:
            console.log("adding");
            if(clickedButtonId === "mod") {
                inputString += "%";
            } else if(clickedButtonId === "÷") {
                inputString += "/";
            } else {
                inputString += clickedButtonId;
            }
            input.innerText += clickedButtonId;
            console.log("user", input.innerText);
            console.log("computer", inputString);

         default:
            console.log("user", input.innerText);
            console.log("computer", inputString);
            break;
    }
}