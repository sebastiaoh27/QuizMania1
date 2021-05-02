socket.on("connect", ()=> {
    document.getElementById("header").innerHTML = (JSON.parse(sessionStorage.getItem("room"))).password
    document.getElementById("selector-icon").addEventListener('click',()=>{
        document.getElementById("selector-icon").classList.add('is-focused');
    })
    sessionStorage.setItem("theme",0)
    load();
})

var history = []
var sports = []
var arts = []
var scienceList = []
var geography = []
var entertainment = []


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
        document.getElementById("selector-box").style.visibility = "visible"
        loadQuiz()
    }
    if (sessionStorage.getItem("stage") == "questions") {
        document.getElementById("selector-box").style.visibility = "hidden"
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
          sessionStorage.setItem("quizzes",JSON.stringify(res))
          var t = parseInt(sessionStorage.getItem("theme"))
          console.log(t)
          quizBox.innerHTML = ""
          for (var r in res) {
              console.log(t-1 !== res[r].themeId)
              console.log(t !== 0)
              if (t-1 !== res[r].themeId && t !== 0){
                  console.log("cc")
                  continue;
              }
              var icon = null
              switch (res[r].themeId) {
                  case 0:

                      icon = "public"
                      break;
                  case 1:

                      icon = "science"
                      break;
                  case 2:

                      icon = "history_edu"
                      break;
                  case 3:

                      icon = "color_lens"
                      break;
                  case 4:

                      icon = "sports_soccer"
                      break;
                  case 5:

                      icon = "movie"
                      break;
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

function selectTheme(id) {
    var selector = document.getElementById("selector-label")
    sessionStorage.setItem("theme",id)
    switch (parseInt(id)) {
        case 0:
            selector.textContent = "All"
            break;
        case 1:

            selector.textContent = "Geography"
            break;
        case 2:
            selector.textContent = "Science"
            break;
        case 3:

            selector.textContent = "Arts"
            break;
        case 4:
            selector.textContent = "History"
            break;
        case 5:
            selector.textContent = "Entertainment"
            break;
        case 6:
            selector.textContent = "Sports"
    }
    loadQuiz()
}



