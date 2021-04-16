var express = require('express');
var router =express.Router();
var fs = require('fs');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var path = "./public/database/quizzes.json"

var id = 0;





//Create
router.post('/createQuiz',urlencodedParser,function (req,res) {
    fs.readFile(path,'utf8',function (err,data) {
        var quizzes = JSON.parse(data);
        while (quizzes["quiz"+id]) {
            id++;
        }
        quizzes["quiz" + id] = {
            "id":id,
            "name": req.body.name,
            "themeId": parseInt(req.body.themeId)
        };
        fs.writeFile(path,JSON.stringify(quizzes),'utf8',function (err) {
            if (err) {
                return console.log(err)
            }
        })
        res.end(JSON.stringify(quizzes["quiz"+id]))
    })
})
//Read
router.get('/quizzes',function (req,res) {
    fs.readFile(path,'utf8',function (err,data) {
        var quizzes = JSON.parse(data);
        res.end(JSON.stringify(quizzes))
    })
})
router.get('/quiz/:id',function (req,res) {
    fs.readFile(path,'utf8',function (err,data) {
        var quizzes = JSON.parse(data);
        var quiz = quizzes["quiz"+req.params.id]
        res.end(JSON.stringify(quiz))
    })
})
router.get('/quizzes/:themeId',function (req,res) {
    fs.readFile(path,'utf8',function (err,data) {
        var quizzes = JSON.parse(data);
        var inTheme = {}
        for (var quiz in quizzes) {
            if(quizzes[quiz].themeId == parseInt(req.params.themeId)) {
                inTheme[quiz] = quizzes[quiz];
            }
        }
        res.end(JSON.stringify(inTheme))
    })
})

//Update

router.patch('/setTheme/:id',urlencodedParser,function (req,res){
    fs.readFile(path,'utf8',function (err,data) {
        var quizzes = JSON.parse(data);
        quizzes["quiz"+req.params.id].themeId = parseInt(req.body.themeId)
        fs.writeFile(path,JSON.stringify(quizzes),'utf8',function (err){
            if(err){
                return console.log(err)
            }
        })
        res.end(JSON.stringify(quizzes["quiz"+req.params.id]))
    })
})
//Delete

router.delete('/deleteQuiz/:id',function (req,res){
    fs.readFile(path,'utf8',function (err,data) {
        var quizzes = JSON.parse(data);
        delete quizzes["quiz"+req.params.id]
        fs.writeFile(path,JSON.stringify(quizzes),'utf8',function (err){
            if(err){
                return console.log(err)
            }
        })
        res.end(JSON.stringify(quizzes))
    })
})

module.exports = router