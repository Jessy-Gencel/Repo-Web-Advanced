(function initialisation(){
    const main =  document.getElementById("main");
    const body = document.getElementById("body");
    let blackbar = document.createElement("area")
    blackbar.id="blackBar"
    main.appendChild(blackbar)
    let leftanime = document.createElement('section')
    leftanime.id = "leftpicture"
    main.appendChild(leftanime);
    let rightanime = document.createElement("section")
    rightanime.id = "rightpicture";
    rightanime.className = "overlay"
    main.appendChild(rightanime);
    let createbuttonsection = document.createElement("section")
    createbuttonsection.id = "buttonsection"
    leftanime.className = "overlay"
    main.appendChild(createbuttonsection)
    let buttonsection = document.getElementById("buttonsection")
    let higherbutton = document.createElement("button")
    higherbutton.id = "higherbutton"
    higherbutton.className = "gamebuttons"
    higherbutton.textContent = "Higher"
    buttonsection.appendChild(higherbutton)
    let lowerbutton = document.createElement("button")
    lowerbutton.id = "lowerbutton"
    lowerbutton.className = "gamebuttons"
    lowerbutton.textContent = "Lower"
    buttonsection.appendChild(lowerbutton)
    let scorecount = document.createElement('p');
    scorecount.id='currentscore'
    scorecount.innerHTML ="Score: 0"
    body.appendChild(scorecount)
    let highscore = document.createElement('p');
    highscore.id='highscore'
    highscore.innerHTML ="Highscore: 0"
    body.appendChild(highscore)
    body.className = "neutral"
    body.removeChild(document.getElementById("overlay"))
})();

const leftanime = document.getElementById( 'leftpicture' );
const rightanime = document.getElementById( 'rightpicture' );
const higherbutton = document.getElementById('higherbutton')
const lowerbutton = document.getElementById('lowerbutton')
let currenttwoanime = 0;
let randomarray = [];
let currentscore = document.getElementById("currentscore")
let scorecounter = 0
let highscore = document.getElementById("highscore")
let highscorecounter = 0
let hiddenvalue; 

if (localStorage.getItem("highscoreEasy") != null){
highscorecounter = JSON.parse(localStorage.getItem("highscoreEasy"));
highscore.innerHTML = `Highscore: ${JSON.parse(localStorage.getItem("highscoreEasy"))}`
} else {
    localStorage.setItem("highscoreEasy", "0")
}
console.log(highscorecounter);

checkscores = () => {    
    if(scorecounter > highscorecounter){
        highscorecounter = scorecounter
        localStorage.removeItem("highscoreEasy")
        localStorage.setItem("highscoreEasy", JSON.stringify(highscorecounter))
        highscore.innerHTML = `Highscore: ${JSON.parse(localStorage.getItem("highscoreEasy"))}`
    }
    scorecounter = 0   
    currentscore.innerHTML = `Score: ${scorecounter}`
}


lossScreen = () =>{
    body.className= "overlay"
    let losscontainer = document.createElement("div")
    losscontainer.id = "losscontainer"
    losscontainer.className = "slide-in-left"
    body.appendChild(losscontainer)
    let lossdiv = document.createElement("div")
    lossdiv.id = "lossscreen"
    lossdiv.innerHTML = `<p> You guessed wrong you ended on a score of 
    ${scorecounter} </p>
    <section id= button_hub>
    <button id= back_to_menu>back to menu</button>
    <button id= play_again>Play again!</button>
    </section>`

    losscontainer.appendChild(lossdiv)
    document.getElementById("back_to_menu").addEventListener("click", ()=>{window.location.reload()})
    document.getElementById("play_again").addEventListener("click", ()=>{
        body.removeChild(document.getElementById("losscontainer"))
        body.removeAttribute( "class", "overlay");
        currenttwoanime = 0
        displayanime()
    })
}

async function loadjson(){
    let garbled_data = await fetch("../json/Anime_titles.json");  
    let data = await garbled_data.json();  
    return data;
}
function firsttwo(array){
    return new Promise((resolve, reject) => {
        randomarray = array.sort(() => Math.random() - 0.5)
        let correctformat = randomarray.slice(randomarray.length - 2,randomarray.length)
        randomarray.pop()
        randomarray.pop()
        currenttwoanime = correctformat
        resolve(correctformat)
    })
}
let switcher = async (array) => {
    return new Promise((resolve, reject) => {
        let [right, left] = array;
        let firstelement = right;
        right = left;
        left = firstelement;
        currenttwoanime = [right, left];
        resolve ([right, left]);
    })
}

async function switchanime(){
    if(currenttwoanime == 0){
        currenttwoanime = await loadjson().then(data => firsttwo(data))
    }else{
        randomarray.pop()
        currenttwoanime.pop()
        currenttwoanime.push(...randomarray.slice(randomarray.length -1,randomarray.length))    
        currenttwoanime = await switcher(currenttwoanime)   
    }
    
    return currenttwoanime
}
async function displayanime(){
    higherbutton.disabled = false
    lowerbutton.disabled = false
    let currenttwoanime = await switchanime()
    let dottedformat = ""
    leftanime.innerHTML = ""
    rightanime.innerHTML = ""

    for (let i = 0; i <= 1; i++) {
        let malmembers = JSON.parse(currenttwoanime[i].Malmembers)
        let stringmalmembers = malmembers.toString()
        let titles = document.createElement("div")
        let url = currenttwoanime[i].url
        let big_array = []
        for (let j = 0; stringmalmembers.length > j ;j++) {
            let array_of_character = stringmalmembers.slice(j,j+1)
            big_array.push(array_of_character)
        }
        console.log(big_array);
        if(big_array.length >= 7){
            dottedformat = `${big_array[0]}.${big_array[1]}${big_array[2]}${big_array[3]}.${big_array[4]}${big_array[5]}${big_array[6]}`
        }else{
            dottedformat = `${big_array[0]}${big_array[1]}${big_array[2]}.${big_array[3]}${big_array[4]}${big_array[5]}`
        }
        titles.innerHTML = `<h2>\"${currenttwoanime[i].name}\"</h2>
        <h3> has</h3>
        <p id= \"viewcount\" >${dottedformat}</p>
        <h3>viewers</h3>`
        titles.className = "titles"

        if (i == 0) {
            hiddenvalue = dottedformat
            rightanime.appendChild(titles);
            document.getElementsByTagName("p")[0].textContent = "???"
            rightanime.setAttribute("style", `background-image:url(${url}) ; 
            background-size: cover;`)
        }
        else {
            leftanime.appendChild(titles);
            leftanime.setAttribute("style", `background-image:url(${url}) ;
            background-size: cover;`)
        }   
    }
    return currenttwoanime
}

higherbutton.addEventListener( "click" , async function(){
    document.getElementsByTagName("p")[1].textContent = `${hiddenvalue}`
    if (parseInt(currenttwoanime[0].Malmembers) > parseInt(currenttwoanime[1].Malmembers)){
        scorecounter += 1
        currentscore.textContent = "Score: " + scorecounter
        console.log(scorecounter)
        setTimeout(displayanime, 2000)
    }else{
        setTimeout(lossScreen,500)
        setTimeout(checkscores,500)
    }

    higherbutton.disabled = true
    lowerbutton.disabled = true
})
lowerbutton.addEventListener( "click" , async function(){
    document.getElementsByTagName("p")[1].textContent = `${hiddenvalue}`
    if (parseInt(currenttwoanime[0].Malmembers) < parseInt(currenttwoanime[1].Malmembers)){
        scorecounter += 1
        currentscore.textContent = "Score: " + scorecounter
        console.log(scorecounter)
        setTimeout(displayanime, 2000)
    }else{
        setTimeout(lossScreen,500)
        setTimeout(checkscores,500)
    }

    higherbutton.disabled = true
    lowerbutton.disabled = true
})
displayanime();
