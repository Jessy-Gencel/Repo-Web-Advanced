const button = document.getElementById("playbutton")
const main = document.getElementById("main")
const body = document.getElementById('body')
const overlay = document.getElementById('overlay')

overlay.className = "overlay"
function introductionmessage(){
    let intro = document.getElementById("invisible")
    intro.id = "visible"
    body.classList.add("transparent") 
    main.removeChild(button)
}

function loadbuttons(callback){
    let keyword = "easy"
    let section = document.createElement("section")
    section.id = "buttons"
    main.appendChild(section)
    for (let i = 0; i <= 2; i++){
        let  newButton = document.createElement("button");
        switch  (i){
            case 0:
                keyword  = "easy"; 
                break;
            case 1:
                keyword = "medium"
                break
            case 2: 
                keyword = "hard"
        }
        newButton.textContent = keyword
        newButton.id = keyword
        section.appendChild(newButton)
        callback(keyword)
    }
}

function addscript (keyword){
    document.getElementById(keyword).addEventListener( "click", () => {
        let script = document.createElement("script")
        script.src = `../js/${keyword}.js`
        document.body.appendChild(script)
        document.getElementById("buttons").remove();
        document.getElementById("visible").remove();
    })
}

button.addEventListener("click", () => {
    introductionmessage()
    loadbuttons((keyword) => {
        addscript(keyword);
    });
});


