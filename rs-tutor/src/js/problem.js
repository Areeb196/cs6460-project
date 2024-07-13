// chart.js, google charts, d3.js
// sessionstorage, localstorage, 
var evalID;
var timerID;
var time_step = 10000;

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
        if (response.result.trim() === '') {
            console.log("empty");
        } else {
            console.log(response.result);
        }
    })
    .catch(error => console.log("Error during compilation: " + error.message));
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
        clearInterval(evalID)
        clearInterval(timerID)
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
    timerElement.textContent = "00:10"

    evalID = setInterval(evaluateCode, time_step);
    timerID = setInterval(updateTimer, 1000);
}

function done() {
    console.log("Stop code evaluation.")
    clearInterval(evalID);
    clearInterval(timerID)
}
