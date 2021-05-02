const socket = io.connect("ws://localhost:9999");


var clicked = false
var answered = false
var pointsPossible = 0;

socket.on("connect", () => {
    var name = null;
    var points = 0;
    while (!name && !sessionStorage.getItem("user")) {
        name = prompt("Please enter your username")
    }
    if (sessionStorage.getItem("user")) {
        var user = JSON.parse(sessionStorage.getItem("user"))
        name = user.name
        points = user.points
    }
    var flag = JSON.parse(sessionStorage.getItem("inRoom"))
    if (!flag) {
        createUser(name)
        sessionStorage.setItem("inRoom",true)
    }
    showUser(name,points)
    start()
})
socket.on("updateServer", (user)=>{

    if (user.id != (JSON.parse(sessionStorage.getItem("user"))).id && user.roomId == (JSON.parse(sessionStorage.getItem("room"))).id ){
        update(user)
    }
})

function createUser(name) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == XMLHttpRequest.DONE) {
            var res = JSON.parse(req.responseText)
            sessionStorage.setItem("user",JSON.stringify(res))
            socket.emit("updateClient", res)
        }
    }
    var room = JSON.parse(sessionStorage.getItem("room"))
    var roomsCreated = JSON.parse(sessionStorage.getItem("roomsCreated"))
    var role =  "user";
    for (r in roomsCreated) {
        if (roomsCreated[r] == room.id){
            role = "host"
        }
    }

    req.open("POST",url+"/createUser",true)
    var body = {
        "name": name,
        "roomId": room.id,
        "role": role
    }
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(body))

}
function showUser(name,points) {

    var user = JSON.parse(sessionStorage.getItem("user"))

    document.getElementById("players").innerHTML = "<li id=\"user\" class=\"mdl-list__item--two-line\">\n" +
        "                            <span class=\"mdl-list__item-primary-content\">\n" +
        "                            <i class=\"material-icons mdl-list__item-icon\">person</i>\n" +
        "                            " + name + "\n" +
        "                             <span class=\"mdl-list__item-sub-title\">" +points+" Points</span>\n</span>\n" +
        "                        </li>"
}

function start() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == XMLHttpRequest.DONE) {
            var res = JSON.parse(req.responseText)
            for (var r in res) {
                if (res[r].id == (JSON.parse(sessionStorage.getItem("user"))).id) {}
                else {
                    document.getElementById("players").innerHTML += "<li id=\""+res[r].id+"\" class=\"mdl-list__item--two-line\">\n" +
                        "                            <span class=\"mdl-list__item-primary-content\">\n" +
                        "                            <i class=\"material-icons mdl-list__item-icon\">person</i>\n" +
                        "                            " + res[r].name +"\n" +
                        "                             <span class=\"mdl-list__item-sub-title\">"+ res[r].points +" Points</span>\n</span>\n" +
                        "                        </li>"
                }
            }

        }
    }
    var roomId = (JSON.parse(sessionStorage.getItem("room"))).id

    req.open("GET",url+"/users/"+ roomId,true);
    req.send();
}
function update(user) {
    var menuItem = "<li id=\""+user.id+"\" class=\"mdl-list__item--two-line\">\n" +
        "                            <span class=\"mdl-list__item-primary-content\">\n" +
        "                            <i class=\"material-icons mdl-list__item-icon\">person</i>\n" +
        "                            " + user.name +"\n" +
        "                             <span class=\"mdl-list__item-sub-title\">0 Points</span>\n</span>\n" +
        "                        </li>"
    document.getElementById("players").innerHTML += menuItem
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function loadAnswers(id) {

    var answers = document.getElementById("answers")
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == XMLHttpRequest.DONE) {
            var res = JSON.parse(req.responseText)
            sessionStorage.setItem("answers",JSON.stringify(res))
            for (var r in res) {
                answers.innerHTML += "<li id=\"a"+res[r].id+ "\" class=\"mdl-list__item answer\" onclick=\"selectAnswer(this.id)\">\n" +
                    "    <span class=\"mdl-list__item-primary-content\">\n" +
                    "      "+res[r].name+" \n" +
                    "    </span>\n" +
                    "  </li>"
                if (res[r].correctAnswer){
                    sessionStorage.setItem("correctAnswer",JSON.stringify(res[r]))
                }
            }

        }
    }
    req.open("GET",url+"/answers/"+id,true);
    req.send();


}

function loadQuestions() {
    var quizBox = document.getElementById("quizBox")
    var req = new XMLHttpRequest();
    req.onreadystatechange = async function () {
        if (req.readyState == XMLHttpRequest.DONE) {
            var res = JSON.parse(req.responseText)

            for (var r in res) {
                clicked = false
                answered = false
                sessionStorage.setItem("selectedAnswer",null)
                quizBox.innerHTML = "<div id=\"timer\" class=\"progress\">" +
                    "                   <div id=\"prog\" class=\"progressBar bar\" style=\"width: 100%\"></div>\n" +
                    "                   <div id=\"buff\" class=\"bufferBar bar\" style=\"width: 100%\"></div>\n" +
                    "                </div>\n" +
                    "                <span class=\" questionTitle mdl-layout-title\" style=\"text-align: center; padding-left: 0\">" + res[r].name + "</span>\n" +
                    "                <nav class=\"mdl-navigation\">\n" +
                    "                    <ul id=\"answers\" class=\"demo-list-icon mdl-list\">\n" +
                    "\n" +
                    "\n" +
                    "                    </ul>\n" +
                    "                </nav>\n";
                loadAnswers(res[r].id)

                const interval = setInterval(()=>{
                    var widthString = document.getElementById("prog").style.width
                    var width = parseInt(widthString.substring(0,widthString.length))
                    document.getElementById("prog").style.width = width - 1 + "%"
                },100)
                await sleep(11000);
                await clearInterval(interval)
                await showAnswer()
                await sleep(5000)
            }

            quizBox.innerHTML = ""
            sessionStorage.setItem("stage","end")
            load()
        }
    }
    var room = JSON.parse(sessionStorage.getItem("room"))
    req.open("GET",url+"/questions/"+room.selectedQuiz,true);
    req.send();
}

function selectAnswer(id) {
    console.log(answered + " " + clicked)
    if (!clicked && !answered){
        var widthString = document.getElementById("prog").style.width
        var width = parseInt(widthString.substring(0,widthString.length))
        pointsPossible = width * 10
        document.getElementById(id).style.backgroundColor = "#b3d4fc"
        var answer = JSON.parse(sessionStorage.getItem("answers"))["answer"+id.substring(1)]
        sessionStorage.setItem("selectedAnswer",JSON.stringify(answer))
        clicked =true
    }
}

function showAnswer() {
    answered = true
    var correctAnswer = JSON.parse(sessionStorage.getItem("correctAnswer"))
    var selectedAnswer = JSON.parse(sessionStorage.getItem("selectedAnswer"))

    if (selectedAnswer && selectedAnswer.id !== correctAnswer.id) {
        document.getElementById(selectedAnswer.id).style.backgroundColor = "#fa9e9e"
    }
    else if (selectedAnswer && selectedAnswer.id === correctAnswer.id) {
        addPoints(pointsPossible)
    }
    document.getElementById("a"+correctAnswer.id).style.backgroundColor = "#a8fc9c"

}

function addPoints(points) {
    var req = new XMLHttpRequest()
    req.onreadystatechange = function() {
        if (req.readyState == XMLHttpRequest.DONE) {
            var res = JSON.parse(req.responseText)
            document.getElementById("user").children[0].children[1].innerHTML = res.points + " Points"
            socket.emit("pointsUpdate", {
                "id":res.id,
                "points":res.points
            })
            sessionStorage.setItem("user",JSON.stringify(res))
        }
    }
    var user = JSON.parse(sessionStorage.getItem("user"))
    req.open("PATCH",url+"/increasePoints/"+ user.id,true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify({
        "points":points
    }));
}

socket.on("addPoints",(user)=>{

    var u = JSON.parse(sessionStorage.getItem("user"))
    if (user.id != u.id){
        document.getElementById(user.id).children[0].children[1].innerHTML = user.points +" Points"
    }
})
function showWinner(){
    var quizBox = document.getElementById("quizBox")
    var req = new XMLHttpRequest()
    req.onreadystatechange = function() {
        if (req.readyState == XMLHttpRequest.DONE) {
            var res = JSON.parse(req.responseText)
            quizBox.innerHTML =  "                <span class=\" questionTitle mdl-layout-title\" style=\"text-align: center; padding-left: 0\">Podium</span>\n" +
                "                <nav class=\"mdl-navigation\">\n" +
                "                    <ul id=\"winners\" class=\"demo-list-icon mdl-list\">\n" +
                "\n" +
                "\n" +
                "                    </ul>\n" +
                "                </nav>\n";
            var count = 1
            var color = ""
            for (var r in res){
                switch (count){
                    case 1:
                        color = "rgba(255,215,0,0.4)"
                        break;
                    case 2:
                        color = "rgba(192,192,192,.4)"
                        break;
                    case 3:
                        color = "rgba(205, 127, 50,.4)"
                        break;
                }
                document.getElementById("winners").innerHTML += "<li class=\"mdl-list__item winner\" style=\"background-color:"+color+"\">\n" +
                    "    <span class=\"mdl-list__item-primary-content\">\n" +
                    "      "+res[r].name+" \n" +
                    "    </span>\n" +
                    "  </li>"
                count++
            }
        }
    }
    var room = JSON.parse(sessionStorage.getItem("room"))
    req.open("GET",url+"/winner/"+ room.id,true);
    req.send();
}
