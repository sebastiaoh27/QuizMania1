socket.on("connect", ()=> {
    document.getElementById("header").innerHTML = (JSON.parse(sessionStorage.getItem("room"))).password

    load();
})



function selectQuiz(id) {
    sessionStorage.setItem("selectedQuiz",id)

    var req = new XMLHttpRequest();
    req.onreadystatechange = async function () {
        if (req.readyState == XMLHttpRequest.DONE) {
            var res = JSON.parse(req.responseText)
            sessionStorage.setItem("room", JSON.stringify(res))
            sessionStorage.setItem("stage", "questions")
            socket.emit("quizSelected",res)
        }
    }
    var room = JSON.parse(sessionStorage.getItem("room"))
    req.open("PATCH",url+"/selectQuiz/"+room.id,true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify({
        "selectedQuiz":id
    }));
}

function load() {
    document.getElementById("quizBox").innerHTML = ""
    if (sessionStorage.getItem("stage") == "quiz") {
        loadQuiz()
    }
    if (sessionStorage.getItem("stage") == "questions") {
        loadQuestions()
    }
    if (sessionStorage.getItem("stage") == "end") {
        showWinner()
    }
}
function loadQuiz() {
  var req = new XMLHttpRequest();

  var quizBox = document.getElementById("quizBox")
  req.onreadystatechange = function() {
      if (req.readyState == XMLHttpRequest.DONE) {
          var res = JSON.parse(req.responseText)

          for (var r in res) {
              var icon = null
              switch (res[r].themeId) {
                  case 0: icon = "public"
                      break;
                  case 1: icon = "science"
                      break;
                  case 2: icon = "history_edu"
                      break;
                  case 3: icon = "pallete"
                      break;
                  case 4: icon = "sports_soccer"
                      break;
                  case 5: icon = "movie"
              }
            quizBox.innerHTML += "<li id=\""+ res[r].id+"\" class=\"mdl-list__item mdl-list__item--three-line quiz\" onclick=\"selectQuiz(this.id)\">\n" +
                "              <span class=\"mdl-list__item-primary-content quizText\">\n" +
                "                <span>"+res[r].name+"</span>\n" +
                "                <span class=\"mdl-list__item-text-body\">\n" +
                "                  "+res[r].description+"\n" +
                "                </span>\n" +
                "              </span>\n" +
                "             <span class=\"mdl-list__item-secondary-content quizIcon\">\n" +
                "      <a class=\"mdl-list__item-secondary-action\" href=\"#\"><i class=\"material-icons\">"+ icon+"</i></a>\n" +
                "    </span>\n"+
                "            </li>"
          }


      }
  }
  req.open("GET",url+"/quizzes",true);
  req.send();
}



socket.on("quizStart",async function (){
    await sleep(5000)

    load();
})


function quizPage(){
    sessionStorage.setItem("stage","quiz")
    sessionStorage.setItem("selectedAnswer",null)
    load()
    socket.emit("quizPage")
}

