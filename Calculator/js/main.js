const all_buttons = document.getElementsByClassName("button")
const inputfield = document.getElementById("display")
const clear = document.getElementsByClassName("clear")
const backspace = document.getElementsByClassName("backspace")
const equals = document.getElementsByClassName("equals")
let display = []
let finalUpdate = true

document.addEventListener('keydown', function(event) {
    const key = event.key; 

    if (key === 'Enter') {
        equals[0].click();
    } else if (key === 'Backspace') { 
        backspace[0].click(); 
    } else {
        const buttons = Array.from(document.querySelectorAll('.button')); 
        const button = buttons.find(b => b.textContent.trim() === key); 

        if (button) { 
            button.click(); 
        }
    }
});

const plus = (...numbers) => {
    let sum = numbers.reduce((accvalue, currentvalue) => accvalue + currentvalue);
    return sum;
}
const subtract = (...numbers) =>{
    let difference = numbers.reduce((accvalue, currentvalue) => accvalue - currentvalue);
    return difference;
}
const multiply = (...numbers) =>{
    let product = numbers.reduce((accvalue, currentvalue) => accvalue * currentvalue);
    return product;
}
const divide = (...numbers) =>{
    let quotient = numbers.reduce((accvalue, currentvalue) => accvalue / currentvalue);
    return quotient; 
}

const updateDisplay = () =>{
    if(typeof display == "number"){
        inputfield.value = display
    }else{
        inputfield.value = [...display].join("");
    }
}

for (const button of all_buttons){
    console.log(button)
    button.addEventListener('click', function(){
        console.log(display)
        if(display == undefined){
            display = []
        }
        display.push(this.textContent)
        updateDisplay();
    })
}

clear[0].addEventListener( 'click' ,function () {
    display = [];
    updateDisplay();
})
backspace[0].addEventListener( 'click' ,function () {
    display.pop();
    updateDisplay();
})

function checkForConsecutiveOperators(display) {
    const operators = [" + ", " - ", " * ", " / "];
    let newDisplay = [];
    for (let i = 0; i < display.length; i++) {
        console.log(display[i])
        console.log(display[i + 1])
        if (operators.includes(display[i]) && operators.includes(display[i + 1])) {
            console.log("Invalid expression!")
            newDisplay = undefined;
            break
        }
        newDisplay.push(display[i]);
    }
    console.log(newDisplay)
    return newDisplay;
}

equals[0].addEventListener( 'click' ,function () {
    const validcharacters = '0123456789+-*/. '
    if (!Array.from(inputfield.value).every(char => validcharacters.includes(char))) {
        alert("Please enter a valid number or operator!");
        display = [];
        updateDisplay();
        return
    }
    if(display.length == 0){
        display = []
        updateDisplay()
        return
    }
    if(checkForConsecutiveOperators(display) == undefined){
        alert("Invalid expression!");
        display = [];
        updateDisplay();
        return  
    }
    console.log(display)
   if (display.indexOf(" + ")  !=-1 && display.indexOf(" - ")== -1 && display.indexOf(" x ") == -1&&display.indexOf(" / ")== -1 ) {
        let split = inputfield.value.split(" + ")
        let numbers = split.map(num => parseInt(num))
        let sum = plus(...numbers)
        
        if(checkForNan(sum)){
            display = sum
        }
   }else if (display.indexOf(" + ")  ==-1 && display.indexOf(" - ")!= -1 && display.indexOf(" x ") == -1&&display.indexOf(" / ")== -1 ) {
        let split = inputfield.value.split(" - ")
        let numbers = split.map(num => parseInt(num))
        let difference = subtract(...numbers)
        if(checkForNan(difference)){
            display = difference
        }
   }else if (display.indexOf(" + ")  ==-1 && display.indexOf(" - ")== -1 && display.indexOf(" x ") != -1&&display.indexOf(" / ")== -1 ) {
        let split = inputfield.value.split(" * ")
        let numbers = split.map(num => parseInt(num))
        let product = multiply(...numbers)
        if(checkForNan(product)){
            display = product
        }
   }else if (display.indexOf(" + ")  ==-1 && display.indexOf(" - ")== -1 && display.indexOf(" x ") == -1&&display.indexOf(" / ")!= -1 ) {
        let split = inputfield.value.split(" / ")
        let numbers = split.map(num => parseInt(num))
        if(numbers.indexOf(0) != -1){
            alert("You can't divide by 0 you doofus")
        }else{
            let quotient = divide(...numbers)
            if(checkForNan(quotient)){
                display = quotient
            }
        }
   }else{
        const result = eval(inputfield.value);
        checkForNan(result);
   }
   console.log(finalUpdate)
   if(finalUpdate){
    updateDisplay
    display = [inputfield.value]
   }else{
    finalUpdate = true
   }
})

const checkForNan = (result) => {
    if (isNaN(result)) {
        alert("Invalid expression!");
        display = undefined;
        inputfield.value = "";
        finalUpdate = false
        return false;
    }else{
        inputfield.value = result;
        return true;
    }
}