var url = "http://localhost:9999"

function openMenu() {
    document.getElementById("title").style.zIndex = "0"
    document.getElementById("content").style.zIndex = "0"
    setTimeout(function () {
        document.getElementById("body").style.gridTemplateColumns = "0.25fr 1fr";
        var left = document.getElementById("left");
        left.style.width = "15%"
        left.style.visibility = "visible";
        document.getElementById("help").style.visibility = "visible";
        document.getElementById("home").style.visibility = "visible";
        document.getElementById("create-room").style.visibility = "visible";
        document.getElementById("contact").style.visibility = "visible";
    },200)


    document.getElementById("open-menu").style.visibility = "hidden";
    console.log("open")

}

function closeMenu() {
    document.getElementById("help").style.visibility = "hidden";
    document.getElementById("home").style.visibility = "hidden";
    document.getElementById("create-room").style.visibility = "hidden";
    document.getElementById("contact").style.visibility = "hidden";
    document.getElementById("body").style.gridTemplateColumns = "0fr 1fr";
    var left = document.getElementById("left")
    left.style.width = "0"
    setTimeout(function () {
        document.getElementById("title").style.zIndex = "2"
        document.getElementById("content").style.zIndex = "2"
        document.getElementById("open-menu").style.visibility = "visible";
    },200)

    console.log("close")
}

function goHome() {
    location.href = '/'
}
function goCreateRoom() {
    location.href = '/createRoom'
}
function goCreateQuiz() {
    location.href = '/createQuiz'
}
function goContact() {
    location.href = '/contact'
}

function copyToClipboard() {
    var textArea = document.createElement("textarea")
    document.body.appendChild(textArea)
    console.log(sessionStorage.getItem("pass"))
    textArea.value = sessionStorage.getItem("pass")
    textArea.select()
    try {
        document.execCommand('copy');
    } catch (e) {
        console.log(e)
    }
    document.body.removeChild(textArea)


}

function goHostRoom() {
    location.href = '/hostRoom'
    sessionStorage.setItem("stage","quiz")
}

function post(urlString,body,callback) {
    var req = new XMLHttpRequest()
    req.onreadystatechange = callback
    req.open("POST",url+urlString,true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(body));
}

function patch(urlString,body,callback) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = callback
    req.open("PATCH",url+urlString,true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(body));
}

function get(urlString,callback) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = callback
    req.open("GET",url+urlString,true);
    req.send();
}

