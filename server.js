
var express = require('express');
var app = express();
var indexRouter = require("./routes/index")
var roomRest = require("./routes/rooms")
var userRest = require("./routes/users")
var quizRest = require("./routes/quizzes")
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
app.use(jsonParser)

const server = require('http').createServer(app);
const io = require('socket.io')(server);


server.listen(9999);
app.use(express.static(__dirname + '/public'))
app.get('/',indexRouter);
app.get('/help',indexRouter);
app.get('/contact',indexRouter);
app.get('/createRoom',indexRouter);

//room
app.get('/rooms',roomRest);
app.get('/room/:id',roomRest)
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
app.patch('/deleteQuiz/:id',quizRest)






io.on("connection", client => {
    client.send("test")
    console.log("connected")
})


