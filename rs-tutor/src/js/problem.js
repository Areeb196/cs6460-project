var intervalID;
var time_step = 10000;

function getUserCode() {
    // Get all elements with class name "ace_line"
    let elements = document.getElementsByClassName("ace_line");
    let code = ""

    // Loop through each element
    for (let i = 0; i < elements.length; i++) {
        code += elements[i].innerText + "\n";
    }
    console.log(code);
}

function start() {
    intervalID = setInterval(getUserCode, time_step);
}

function done() {
    clearInterval(intervalID);
}
