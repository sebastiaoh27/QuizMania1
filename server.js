
var express = require('express');
var app = express();
var indexRouter = require("./routes/index")
var roomRest = require("./routes/rooms")
var userRest = require("./routes/users")
var quizRest = require("./routes/quizzes")
var questionRest = require("./routes/questions")
var answerRest = require("./routes/answers")
var themeRest = require("./routes/themes")
var url = "QuizMania/public/"

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
app.use(jsonParser)

const server = require('http').createServer(app);
const io = require('socket.io')(server);


server.listen(9999);
app.use(express.static(__dirname + '/public'))
app.get(url+'/',indexRouter);
app.get(url+'/createQuiz',indexRouter);
app.get(url+'/contact',indexRouter);
app.get(url+'/createRoom',indexRouter);
app.get(url+'/room',indexRouter);
app.get(url+'/hostRoom',indexRouter);

//room
app.get('/rooms',roomRest);
app.get('/room/:id',roomRest)
app.get('/joinRoom/:password',roomRest)
app.post('/createRoom',roomRest)
app.patch('/selectQuiz/:id',roomRest)
app.delete('/deleteRoom/:id',roomRest)


//user
app.post('/createUser',userRest);
app.get('/users',userRest);
app.get('/user/:id',userRest);
app.get('/users/:roomId',userRest)
app.get('/winner/:roomId',userRest)
app.patch('/increasePoints/:id',userRest)
app.patch('/resetPoints/:roomId',userRest)
app.delete('/deleteUser/:id',userRest)

//quiz
app.post('/createQuiz',quizRest)
app.get('/quizzes',quizRest)
app.get('/quiz/:id',quizRest)
app.get('/quizzes/:themeId',quizRest)
app.patch('/setTheme/:id',quizRest)
app.delete('/deleteQuiz/:id',quizRest)

//question
app.post('/createQuestion',questionRest)
app.get('/questions',questionRest)
app.get('/question/:id',questionRest)
app.get('/questions/:roomId',questionRest)
app.patch('/editQuestion/:id',questionRest)
app.delete('/deleteQuestion/:id',questionRest)

//answer
app.post('/createAnswer',answerRest)
app.get('/answers',answerRest)
app.get('/answer/:id',answerRest)
app.get('/answers/:questionId',answerRest)
app.patch('/editAnswer/:id',answerRest)
app.patch('/setCorrectAnswer/:id',answerRest)
app.delete('/deleteAnswer/:id',answerRest)

//theme
app.post('/createTheme',themeRest)
app.get('/themes',themeRest)
app.get('/theme/:id',themeRest)
app.patch('/editTheme/:id',themeRest)
app.delete('/deleteTheme/:id',themeRest)

var clientId = 0
io.on("connection", (client) => {
    var c = client
    c.id = clientId++
    console.log(c.id)
    client.on("updateClient",(user)=>{
        console.log("updateServer")
        client.broadcast.emit("updateServer",user)
    })

    client.on("quizSet",()=>{
        client.broadcast.emit("quizStart")
    })

    client.on("quizSelected",(res)=>{
        client.broadcast.emit("updateQuiz",res)
    })

    client.on("quizPage",()=>{
        client.broadcast.emit("quizChoose")
    })

    client.on("pointsUpdate",(user)=>{
        client.broadcast.emit("addPoints",user)
    })
})


