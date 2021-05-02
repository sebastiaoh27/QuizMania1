var questions = []
var theme;
var quizToggle = "  <div class=\"mdl-textfield mdl-js-textfield input mdl-textfield--floating-label newMdl\">\n" +
    "<input class=\"mdl-textfield__input\" type=\"text\" id=\"questionTitleCreate\">\n" +
    "<label id=\"roomInput\" class=\"mdl-textfield__label\" for=\"questionTitleCreate\">Input Question...</label>\n" +
    "</div>" +
    "<div class='answerCreator'>" +
        "<div class=\"mdl-textfield mdl-js-textfield input mdl-textfield--floating-label newMdl\">\n" +
        "<input class=\"mdl-textfield__input\" type=\"text\" id=\"questionAnswerCreate1\">\n" +
        "\<label id=\"roomInput\" class=\"mdl-textfield__label\" for=\"questionAnswerCreate1\">Input answer...</label>\n" +
        "</div>" +
    "<label class=\"mdl-radio mdl-js-radio mdl-js-ripple-effect newMdl\" for=\"option-1\">\n" +
    "<input type=\"radio\" id=\"option-1\" class=\"mdl-radio__button\" name=\"options\" value=\"1\" checked>\n" +
    "<span class=\"mdl-radio__label\">correct answer</span>\n" +
                        "</label>" +
    "</div>" +
        "<div class='answerCreator'>" +
        "<div class=\"mdl-textfield mdl-js-textfield input mdl-textfield--floating-label newMdl\">\n" +
        "<input class=\"mdl-textfield__input\" type=\"text\" id=\"questionAnswerCreate2\">\n" +
        "<label id=\"roomInput\" class=\"mdl-textfield__label\" for=\"questionAnswerCreate2\">Input answer...</label>\n" +
        "</div>" +
    "<label class=\"mdl-radio mdl-js-radio mdl-js-ripple-effect newMdl\" for=\"option-2\">\n" +
    "<input type=\"radio\" id=\"option-2\" class=\"mdl-radio__button\" name=\"options\" value=\"2\">\n" +
    "<span class=\"mdl-radio__label\">correct answer</span>\n" +
                        "</label>" +
    "</div>" +
    "<div class='answerCreator'>" +
    "<div class=\"mdl-textfield mdl-js-textfield input mdl-textfield--floating-label newMdl\">\n" +
    "<input class=\"mdl-textfield__input\" type=\"text\" id=\"questionAnswerCreate3\">\n" +
    "<label id=\"roomInput\" class=\"mdl-textfield__label\" for=\"questionAnswerCreate3\">Input answer...</label>\n" +
    "</div>" +
    "<label class=\"mdl-radio mdl-js-radio mdl-js-ripple-effect newMdl\" for=\"option-3\">\n" +
    "<input type=\"radio\" id=\"option-3\" class=\"mdl-radio__button\" name=\"options\" value=\"3\">\n" +
    "<span class=\"mdl-radio__label\">correct answer</span>\n" +
                        "</label>" +
    "</div>" +
    "<div class='answerCreator'>" +
    "<div class=\"mdl-textfield mdl-js-textfield input mdl-textfield--floating-label newMdl\">\n" +
    "<input class=\"mdl-textfield__input\" type=\"text\" id=\"questionAnswerCreate4\">\n" +
    "<label id=\"roomInput\" class=\"mdl-textfield__label\" for=\"questionAnswerCreate4\">Input answer...</label>\n" +
    "</div>" +
    "<label class=\"mdl-radio mdl-js-radio mdl-js-ripple-effect newMdl\" for=\"option-4\">\n" +
    "<input type=\"radio\" id=\"option-4\" class=\"mdl-radio__button\" name=\"options\" value=\"4\">\n" +
    "<span class=\"mdl-radio__label\">correct answer</span>\n" +
                        "</label>" +
    "</div>"
function createQuiz() {
    var req= new XMLHttpRequest()
    var name = document.getElementById("quizName").value
    var description = document.getElementById("quizDesc").value
    var box = document.getElementById("quizCreatorBox")
    req.onreadystatechange = function() {
        if (req.readyState == XMLHttpRequest.DONE) {
            var res = JSON.parse(req.responseText)
            sessionStorage.setItem("quiz",JSON.stringify(res))
            box.style.width = '100%'
            box.innerHTML = "<div id=\"quizCreation\" class=\"content\">\n" +
                "        <div class=\"quizBox\">\n" +
                "          <ul id=\"quizBox\" class=\"demo-list-three mdl-list quizContainer\">\n" +
                "<li id=\"newQuiz\" class=\"mdl-list__item answer questionMaker\" onclick=\"createQuestion()\">\n" +
                "    <span class=\"mdl-list__item-primary-content \">\n" +
                "      "+
                "<i class=\"newQuizLogo material-icons\">add_circle_outline</i>"+

                " \n" +
                "    </span>\n" +
                "  </li>" +
                "          </ul>\n" +
                "        </div>\n" +
                "      </div>\n" +
                "<button id=\"sendQuiz\" onclick=\"sendQuiz()\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent\" style='background-color: cadetblue'>\n" +
                "        Create Quiz\n" +
                "      </button>" +
                "      <button id=\"deleteQuiz\"onclick=\"deleteQuiz()\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent\" style='background-color: red'>\n" +
                "        Delete Quiz\n" +
                "      </button>"
        }
    }
    req.open("POST",url+"/createQuiz",true)
    var body = {
        "name":name,
        "description":description,
        "themeId":theme
    }
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(body))
}

function selectTheme(id) {
    theme = id;
    var selector = document.getElementById("selector-label")
    switch (parseInt(id)) {
        case 0:

            selector.textContent = "Geography"
            break;
        case 1:
            selector.textContent = "Science"
            break;
        case 2:

            selector.textContent = "Arts"
            break;
        case 3:
            selector.textContent = "History"
            break;
        case 4:
            selector.textContent = "Entertainment"
            break;
        case 5:
            selector.textContent = "Sports"
    }
}

function createQuestion() {
    var box = document.getElementById("quizBox")
    var l = box.children.length

    if (l < 2 || checkIfEmpty(box.children[l-2])){
        if (l > 1){
            save(box.children[l-2])
        }
        var newQuiz = document.getElementById("newQuiz")

        var q = newQuiz.outerHTML

        newQuiz.id = ""
        newQuiz.style.height = "50vh"
        newQuiz.removeAttribute("onclick")
        newQuiz.innerHTML = quizToggle

        box.innerHTML += q
    } else {
        var notification = document.querySelector('.mdl-js-snackbar');
        notification.MaterialSnackbar.showSnackbar(
            {
                message: 'Please fill in the question before creating a new one!'
            }
        );
    }
    let mdlElements = document.querySelectorAll(".newMdl")
    componentHandler.upgradeElements(mdlElements)
    componentHandler.upgradeAllRegistered()
}

function checkIfEmpty(e) {

    return e.children[0].children[0].value &&
        e.children[1].children[0].children[0].value &&
        e.children[2].children[0].children[0].value &&
        e.children[3].children[0].children[0].value &&
        e.children[4].children[0].children[0].value
}

function save(e) {

    var name = e.children[0].children[0].value
    var a1 = e.children[1].children[0].children[0].value
    var a2 = e.children[2].children[0].children[0].value
    var a3 = e.children[3].children[0].children[0].value
    var a4 = e.children[4].children[0].children[0].value
    var correctAnswer = document.querySelectorAll(".is-checked")[document.querySelectorAll(".is-checked").length -1].children[0]
    console.log(correctAnswer)
    var cId = correctAnswer.value

    questions.push({
        "name":name,
        "a1":a1,
        "a2":a2,
        "a3":a3,
        "a4":a4,
        "correctAnswer":cId
    })
    e.style.height = "62px"
    e.innerHTML = "    <span class=\"mdl-list__item-primary-content \">\n" +
        "      "+
        "<i class=\"newQuizLogo material-icons\">check_circle</i>"+

        " \n" +
        "    </span>\n"
}

function deleteQuiz() {
    var quiz = JSON.parse(sessionStorage.getItem("quiz"))
    var req = new XMLHttpRequest()
    req.onreadystatechange = function() {
        if (req.readyState == XMLHttpRequest.DONE) {
            goCreateQuiz()
        }
    }

    req.open("DELETE",url+"/deleteQuiz/"+ quiz.id,true);
    req.send();
}

function sendQuiz() {
    var quiz = JSON.parse(sessionStorage.getItem("quiz"))
    var box = document.getElementById("quizBox")
    if (checkIfEmpty(box.children[box.children.length-2])){
        save(box.children[box.children.length-2])
    }
    for (const q in questions) {
        var req = new XMLHttpRequest()
        req.onreadystatechange = function() {
            if (req.readyState == XMLHttpRequest.DONE) {
                var res = JSON.parse(req.responseText)
                createAnswers(questions[q],res.id)
            }
        }
        req.open("POST",url+"/createQuestion",true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
                "name":questions[q].name,
                "quizId":quiz.id
            })
        );
    }
    goCreateQuiz()
}

function createAnswers(e,id) {
    for (let i = 1; i < 5; i++) {
        var req = new XMLHttpRequest()
        req.onreadystatechange = function() {
            if (req.readyState == XMLHttpRequest.DONE) {
                var res = JSON.parse(req.responseText)
            }
        }
        req.open("POST",url+"/createAnswer",true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
                "name":e["a"+i],
                "questionId": id,
                "correctAnswer": (e.correctAnswer === i)
            })
        );
    }
}
