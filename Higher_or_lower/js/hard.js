import {initialisation,loadHighscore,checkscores,lossScreen,displayanime} from "./AlgemeneFuncties.js";
initialisation;

const leftanime = document.getElementById( 'leftpicture' );
const rightanime = document.getElementById( 'rightpicture' );
const higherbutton = document.getElementById('higherbutton')
const lowerbutton = document.getElementById('lowerbutton')
let animedata = {
    currenttwoanime: 0,
    randomarray: [],
    hiddenvalue: 0
}
let scores = {
    scorecounter: 0,
    highscorecounter: 0,
    currentscore: document.getElementById("currentscore"),
    highscore: document.getElementById("highscore")
}

loadHighscore("Hard",scores)

higherbutton.addEventListener( "click" , async function(){
    document.getElementsByTagName("p")[1].textContent = `${animedata.hiddenvalue}`
    if (parseInt(animedata.currenttwoanime[0].Malfollowers) > parseInt(animedata.currenttwoanime[1].Malfollowers)){
        scores.scorecounter += 1
        scores.currentscore.textContent = "Score: " + scores.scorecounter
        console.log(scores.scorecounter)
        setTimeout(function() {displayanime(higherbutton,lowerbutton,leftanime,rightanime,
            animedata, "Hard"
        )}, 2000)
    }else{
        setTimeout(function() {lossScreen(scores,animedata,higherbutton,lowerbutton,leftanime,rightanime,"Hard")},500)
        setTimeout(function() {checkscores(scores,"Hard")},500)
    }

    higherbutton.disabled = true
    lowerbutton.disabled = true
})
lowerbutton.addEventListener( "click" , async function(){
    document.getElementsByTagName("p")[1].textContent = `${animedata.hiddenvalue}`
    if (parseInt(animedata.currenttwoanime[0].Malfollowers) < parseInt(animedata.currenttwoanime[1].Malfollowers)){
        scores.scorecounter += 1
        scores.currentscore.textContent = "Score: " + scores.scorecounter
        console.log(scores.scorecounter)
        setTimeout(function() {displayanime(higherbutton,lowerbutton,leftanime,rightanime,
            animedata, "Hard"
        )}, 2000)
    }else{
        setTimeout(function() {lossScreen(scores,animedata,higherbutton,lowerbutton,leftanime,rightanime,"Hard")},500)
        setTimeout(function() {checkscores(scores,"Hard")},500)
    }

    higherbutton.disabled = true
    lowerbutton.disabled = true
})

displayanime(higherbutton,lowerbutton,leftanime,rightanime,animedata, "Hard");