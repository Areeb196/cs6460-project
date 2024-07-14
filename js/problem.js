var evalID;
var timerID;
var time_step = 0;

// Constants
const TIME_STEP_LEN = 10000;
const MILLI_PER_SEC = 1000;
const START_TIME_LEN = "15:00";

// TD-BKT parameters
const L = 0.5;
const S = 0.1;
const G = 0.1;
const E_k = 30;

var skill_probs = [L];

function fetch_with_timeout(url, options, timeout = 6000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))
    ]);
}

function getUserCode() {
    // Get all elements with class name "ace_line"
    let elements = document.getElementsByClassName("ace_line");
    let code = "";

    // Loop through each element
    for (let i = 0; i < elements.length; i++) {
        code += elements[i].innerText + "\n";
    }
    return code;
}

function evaluateCode() {
    console.log("Evaluating code...")

    let text = getUserCode();
    var params = {
        version: "stable",
        optimize: "0",
        code: text,
        edition: "2021"
    };

    // Case insensitive regex to match "error" before variations of "borrow" including newlines
    var regex = /\berror\b(?=[\s\S]*\bborrow(?:s|ing|ed)?\b)/i;

    fetch_with_timeout("https://play.rust-lang.org/evaluate.json", {
        headers: {
            'Content-Type': "application/json",
        },
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(params)
    })
    .then(response => response.json())
    .then(response => {
        if (regex.test(response.result)) {
            // o = 0
            let A_i = Math.min(1, time_step/E_k)
            skill_probs.push(
                ( L*( A_i*S + 1-A_i ) ) / ( 1-A_i + A_i*(L*S+(1-L)*(1-G)) )
            )
        } else {
            // o = 1
            skill_probs.push(
                ( L*(1-S) ) / ( L*(1-S) + (1-L)*G )
            )
        }
    })
    .catch(error => console.log("Error during compilation: " + error.message));

    time_step++
    console.log(skill_probs)
}

function updateTimer() {
    let timerElement = document.getElementById('timer')
    let [minutes, seconds] = timerElement.textContent.split(':')
    let formattedTime
    
    minutes = parseInt(minutes, 10)
    seconds = parseInt(seconds, 10)

    seconds--
    if (seconds === 0 && minutes === 0) {
        // timer goes to zero
        done()
        alert("Time's up!")
    }
    else if (seconds < 0) {
        minutes--
        seconds = 59
    }
    
    formattedTime = (minutes < 10 ? "0" + minutes : minutes) + ":" +
                    (seconds < 10 ? "0" + seconds : seconds)
    timerElement.textContent = formattedTime
}

function start() {
    console.log("Start code evaluation.")

    let timerElement = document.getElementById('timer');
    timerElement.style.display = 'block'; // Show the timer element
    timerElement.textContent = START_TIME_LEN

    evalID = setInterval(evaluateCode, TIME_STEP_LEN);
    timerID = setInterval(updateTimer, MILLI_PER_SEC);

    sessionStorage.removeItem("td_bkt");
}

function done() {
    console.log("Stop code evaluation.")
    sessionStorage.setItem("td_bkt", JSON.stringify(skill_probs));
    clearInterval(evalID)
    clearInterval(timerID)
}
