const initialisation = (function() {
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
const loadHighscore = (difficulty,scores) =>{
    if (localStorage.getItem(`highscore${difficulty}`) != null){
        scores.highscorecounter = JSON.parse(localStorage.getItem(`highscore${difficulty}`));
        scores.highscore.innerHTML = `Highscore: ${JSON.parse(localStorage.getItem(`highscore${difficulty}`))}`
    } else {
        localStorage.setItem(`highscore${difficulty}`, "0")
    }
}
const checkscores = (scores,difficulty) => {    
    if(scores.scorecounter > scores.highscorecounter){
        scores.highscorecounter = scores.scorecounter
        localStorage.removeItem(`highscore${difficulty}`)
        localStorage.setItem(`highscore${difficulty}`, JSON.stringify(scores.highscorecounter))
        scores.highscore.innerHTML = `Highscore: ${JSON.parse(localStorage.getItem(`highscore${difficulty}`))}`
    }
    scores.scorecounter = 0   
    scores.currentscore.innerHTML = `Score: ${scores.scorecounter}`
}

const lossScreen = (scores,animedata,higherbutton,lowerbutton,leftanime,rightanime,difficulty) =>{
    body.className= "overlay"
    let losscontainer = document.createElement("div")
    losscontainer.id = "losscontainer"
    losscontainer.className = "slide-in-left"
    body.appendChild(losscontainer)
    let lossdiv = document.createElement("div")
    lossdiv.id = "lossscreen"
    lossdiv.innerHTML = `<p> You guessed wrong you ended on a score of 
    ${scores.scorecounter} </p>
    <section id= button_hub>
    <button id= back_to_menu>back to menu</button>
    <button id= play_again>Play again!</button>
    </section>`

    losscontainer.appendChild(lossdiv)
    document.getElementById("back_to_menu").addEventListener("click", ()=>{window.location.reload()})
    document.getElementById("play_again").addEventListener("click", ()=>{
        body.removeChild(document.getElementById("losscontainer"))
        body.removeAttribute( "class", "overlay");
        animedata.currenttwoanime = 0
        displayanime(higherbutton,lowerbutton,leftanime,rightanime,animedata,difficulty)
    })
}
const loadjson = async(difficulty) => {
    if (difficulty == "Easy"){
        let garbled_data = await fetch("../json/Anime_titles.json");  
        let data = await garbled_data.json();  
        return data;
    }else if (difficulty == "Medium"){
        let garbled_data = await fetch("../json/Anime_characters.json");  
        let data = await garbled_data.json();  
        return data;
    }else{
        let garbled_data = await fetch("../json/Anime_VAs.json");  
        let data = await garbled_data.json();  
        return data;
    }
}
const firsttwo = (array,animedata) => {
    return new Promise((resolve, reject) => {
        animedata.randomarray = array.sort(() => Math.random() - 0.5)
        let correctformat = animedata.randomarray.slice(animedata.randomarray.length - 2,animedata.randomarray.length)
        animedata.randomarray.pop()
        animedata.randomarray.pop()
        animedata.currenttwoanime = correctformat
        resolve(correctformat)
    })
}
let switcher = async (array,animedata) => {
    return new Promise((resolve, reject) => {
        let [right, left] = array;
        let firstelement = right;
        right = left;
        left = firstelement;
        animedata.currenttwoanime = [right, left];
        resolve ([right, left]);
    })
}
const switchanime = async(animedata,difficulty) =>{
    if(animedata.currenttwoanime == 0){
        animedata.currenttwoanime = await loadjson(difficulty).then(data => firsttwo(data,animedata))
    }else{
        animedata.randomarray.pop()
        animedata.currenttwoanime.pop()
        animedata.currenttwoanime.push(...animedata.randomarray.slice(animedata.randomarray.length -1,animedata.randomarray.length))    
        animedata.currenttwoanime = await switcher(animedata.currenttwoanime,animedata)   
    }
    
    return animedata.currenttwoanime
}

const displayanime = async(higherbutton,lowerbutton,leftanime,rightanime,
    animedata,difficulty) =>{

    higherbutton.disabled = false
    lowerbutton.disabled = false
    animedata.currenttwoanime = await switchanime(animedata,difficulty)
    let dottedformat = ""
    leftanime.innerHTML = ""
    rightanime.innerHTML = ""

    for (let i = 0; i <= 1; i++) {
        let malmembers = JSON.parse(animedata.currenttwoanime[i].Malmembers)
        let stringmalmembers = malmembers.toString()
        let titles = document.createElement("div")
        let url = animedata.currenttwoanime[i].url
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
        titles.innerHTML = `<h2>\"${animedata.currenttwoanime[i].name}\"</h2>
        <h3> has</h3>
        <p id= \"viewcount\" >${dottedformat}</p>
        <h3>viewers</h3>`
        titles.className = "titles"

        if (i == 0) {
            animedata.hiddenvalue = dottedformat
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
    return animedata.currenttwoanime
}


export {initialisation, loadHighscore,checkscores,displayanime,lossScreen}

