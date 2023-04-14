// add onclick eventlister
const buttons = document.querySelectorAll(".button")

buttons.forEach( button => {
    button.addEventListener('click', function handleClick(event) {

    const myString = document.querySelector(".question");
    
    if(event.target.id === "clear") {
        myString.textContent = ""; 
    } else {
        myString.textContent += event.target.id;
    }

  });
});
