socket.on("connect", ()=> {
    document.getElementById("header").innerHTML = (JSON.parse(sessionStorage.getItem("room"))).name
    load()
})

socket.on("updateQuiz", async (room)=>{
    sessionStorage.setItem("room",JSON.stringify(room))
    sessionStorage.setItem("selectedQuiz",room.selectedQuiz)
    socket.emit("quizSet")
    sessionStorage.setItem("stage","questions")
    await sleep(4000)
    load()
})

socket.on("quizChoose", ()=>{
    sessionStorage.setItem("stage","waiting")
    load()
    //location.reload()
})

function waitForQuiz(){
    sessionStorage.setItem("stage","waiting")
    var quizBox = document.getElementById("quizBox")
    quizBox.innerHTML = "<div class=\"loading\">\n" +
        "            <span class=\"loadingText\">Waiting for the host to select a quiz...</span>\n" +
        "            <div class=\"mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active spin\"></div>\n" +
        "          </div>"
}

function load() {
    document.getElementById("quizBox").innerHTML = ""
    if (sessionStorage.getItem("stage") == "waiting") {
        waitForQuiz()
    }
    if (sessionStorage.getItem("stage") == "questions") {
        loadQuestions()
    }
    if (sessionStorage.getItem("stage") == "end") {
        showWinner()
    }
}
