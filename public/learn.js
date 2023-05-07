import {convertToMorse, playMorse} from "./player.js"

let startButton = document.querySelector("#startButton")
let buttonContain = document.querySelector("#buttonContain")
let testContain = document.querySelector("#testContain")
let sound = document.querySelector("#sound")
let bpm = document.querySelector("#bpm")
let answer = document.querySelector("#answer")
let feedback = document.querySelector("#feedback")
let learnForm = document.querySelector("#learnForm")

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

startButton.addEventListener("click", () => {
    buttonContain.style.display = "none"
    testContain.style.display = ""
    
    let characters = "etianmsurwdkgohvflpjbxcyzq".toUpperCase()
    characters = characters.shuffle()

    let char = characters[0]
    playMorse(convertToMorse(char), bpm.value, sound)

    let numberUntilRepeat = 2

    let pause = false
    let lastWrong = false
    console.log(characters)
    learnForm.addEventListener("submit", (event) => {
        event.preventDefault()
        answer.focus()
        console.log(pause)
        if (pause) {
            if (lastWrong && answer.value === "") {
                playMorse(convertToMorse(char), bpm.value, sound)
                return
            }
            pause = false
            characters = characters.slice(1)
            if (characters.length === 0) {
                buttonContain.style.display = ""
                testContain.style.display = "none"
                learnForm.removeEventListener("submit", this)
            }
            char = characters[0]
            feedback.innerHTML = ""
            answer.value = ""
            playMorse(convertToMorse(char), bpm.value, sound)
            return
        }
        playMorse(convertToMorse(char), bpm.value, sound)
        if (answer.value === "") {
            return
        } else if (answer.value.toUpperCase() === char) {
            console.log("right")
            feedback.innerHTML = "You got it right!"
            feedback.style.color = "green"
            pause = true
        } else {
            console.log("wrong")
            feedback.innerHTML = `This letter is ${char}`
            feedback.style.color = "blue"
            answer.value = ""
            characters = [characters.slice(0, numberUntilRepeat), char, characters.slice(numberUntilRepeat)].join('')
            pause = true
            lastWrong = true
        }
    })
    
})