import {convertToMorse, playMorse} from "./player.js"

let showMorse = document.querySelector("#showMorse")
let morseElement = document.querySelector("#morseText")
let beatsElement = document.querySelector("#bpm")
let audioElement = document.getElementById("sound")
let button = document.querySelector("#playButton")

button.addEventListener("click", () => {
    let morseText = convertToMorse(morseElement.value)
    let bpm = beatsElement.value
    playMorse(morseText, bpm, audioElement, showMorse)
})
