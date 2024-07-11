// chart.js, google charts, d3.js
// sessionstorage, localstorage, 
var intervalID;
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

function start() {
    console.log("Start code evaluation.")
    intervalID = setInterval(evaluateCode, time_step);
}

function done() {
    console.log("Stop code evaluation.")
    clearInterval(intervalID);
}
