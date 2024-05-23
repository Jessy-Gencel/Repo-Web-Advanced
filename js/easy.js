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
})()

const leftanime = document.getElementById( 'leftpicture' );
const rightanime = document.getElementById( 'rightpicture' );
const higherbutton = document.getElementById('higherbutton')
const lowerbutton = document.getElementById('lowerbutton')
let currenttwoanime = 0;


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
        currenttwoanime.push(randomarray.slice(randomarray.length -1,randomarray.length))    
        currenttwoanime = await switcher(currenttwoanime)   
    }
    console.log(currenttwoanime)
    return currenttwoanime
}
switchanime()