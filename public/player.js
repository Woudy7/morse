const morseCode = {
    "A": ".-",
    "B": "-...",
    "C": "-.-.",
    "D": "-..",
    "E": ".",
    "F": "..-.",
    "G": "--.",
    "H": "....",
    "I": "..",
    "J": ".---",
    "K": "-.-",
    "L": ".-..",
    "M": "--",
    "N": "-.",
    "O": "---",
    "P": ".--.",
    "Q": "--.-",
    "R": ".-.",
    "S": "...",
    "T": "-",
    "U": "..-",
    "V": "...-",
    "W": ".--",
    "X": "-..-",
    "Y": "-.--",
    "Z": "--..",
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    " ": "/",
    "&": ".-...",
    "'": ".----.",
    "@": ".--.-.",
    ")": "-.--.-",
    "(": "-.--.",
    ":": "---...",
    ",": "--..--",
    "=": "-...-",
    "!": "-.-.--",
    ".": ".-.-.-",
    "-": "-....-",
    "%": "-----|-..-.|-----",
    "+": ".-.-.",
    '"': ".-..-.",
    "?": "..--..",
    "/": "-..-.",
    "\n": ".-.-",
    "À": ".--.-",
    "Å": ".--.-",
    "Ä": ".-.-",
    "Ą": ".-.-",
    "Æ": ".-.-",
    "Ć": "-.-..",
    "Ĉ": "-.-..",
    "Ç": "-.-..",
    "Ĥ": "----",
    "Š": "----",
    "Đ": "..-..",
    "É": "..-..",
    "Ę": "..-..",
    "Ð": "..--.",
    "È": ".-..-",
    "Ł": ".-..-",
    "Ĝ": "--.-.",
    "Ĵ": ".---.",
    "Ń": ".---.",
    "Ñ": "--.--",
    "Ó": "---.",
    "Ö": "---.",
    "Ø": "---.",
    "Ś": "...-...",
    "Ŝ": "...-.",
    "Þ": ".--..",
    "Ü": "..--",
    "Ŭ": "..--",
    "Ź": "--..-.",
    "Ż": "--..-",
}

const convertToMorse = (str) => {
    return str.toUpperCase().split("").map(el => {
        return morseCode[el] ? morseCode[el] + " " : " ";
    }).join("");
}

let count = 0
function playMorse(morseText, bpm, audioElement, showMorse) {
    count++
    let myCount = count
    
    let timePerBeat = 1000 * 60 / bpm
    let waitTime = 0

    if (showMorse) {
        showMorse.innerHTML = ""
    }

    for (let i = 0; i < morseText.length; i++) {
        const letter = morseText[i]
        let soundTime = 0
        let addedWaitTime = 0
        switch (letter) {
            case ".":
                soundTime = 1
                addedWaitTime = 1
                break;
            case "-":
                soundTime = 3
                addedWaitTime = 1
                break;
            case " ":
                addedWaitTime = 2
                break
            case "/":
                addedWaitTime = 2
                break
            default:
                break;
        }
        addedWaitTime += soundTime
        setTimeout(() => {
            if (count != myCount) {
                return
            }
            if (showMorse) {
                showMorse.innerHTML += letter 
            }
            audioElement.currentTime = 0
            audioElement.play()
            setTimeout(() => {
                if (count != myCount) {
                    return
                }
                audioElement.currentTime = 1000
                //audioElement.pause()
            }, soundTime * timePerBeat)
        }, waitTime * timePerBeat)
        waitTime += addedWaitTime
    }
}

export {convertToMorse, playMorse}