var express = require('express');
var router =express.Router();
var fs = require('fs');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var path = "./public/database/answers.json"

var id = 0;

//Create
router.post('/createAnswer',urlencodedParser,function (req,res){
    fs.readFile(path,'utf8',function (err,data){
        var answers = JSON.parse(data)
        while (answers["answer"+id]) {
            id++;
        }
        answers["answer"+id] = {
            "id": id,
            "name": req.body.name,
            "correctAnswer": req.body.correctAnswer,
            "questionId": parseInt(req.body.questionId)
        }
        fs.writeFile(path,JSON.stringify(answers),'utf8',function (err){
            if(err){
                return console.log(err)
            }
        })
        res.end(JSON.stringify(answers["answer"+id]))
    })
})
//Read
router.get('/answers',function (req,res){
    fs.readFile(path,'utf8',function (err,data){
        var answers = JSON.parse(data)
       res.end(JSON.stringify(answers))
    })
})
router.get('/answer/:id',function (req,res){
    fs.readFile(path,'utf8',function (err,data){
        var answers = JSON.parse(data)
        var answer = answers["answer"+req.params.id]
        res.end(JSON.stringify(answer))
    })
})
router.get('/answers/:questionId',function (req,res){
    fs.readFile(path,'utf8',function (err,data){
        var answers = JSON.parse(data)
        var inQuestion = {}
        for (var answer in answers) {
            if(answers[answer].questionId == parseInt(req.params.questionId)){
                inQuestion[answer] = answers[answer]
            }
        }
        res.end(JSON.stringify(inQuestion))
    })
})
//Update
router.patch('/editAnswer/:id',urlencodedParser,function (req,res){
    fs.readFile(path,'utf8',function (err,data){
        var answers = JSON.parse(data)
        answers["answer"+req.params.id].name = req.body.name
        fs.writeFile(path,JSON.stringify(answers),'utf8',function (err){
            if(err){
                return console.log(err)
            }
        })
        res.end(JSON.stringify(answers["answer"+req.params.id]))
    })
})

router.patch('/setCorrectAnswer/:id',urlencodedParser,function (req,res){
    fs.readFile(path,'utf8',function (err,data){
        var answers = JSON.parse(data)
        answers["answer"+req.params.id].correctAnswer = req.body.correctAnswer
        fs.writeFile(path,JSON.stringify(answers),'utf8',function (err){
            if(err){
                return console.log(err)
            }
        })
        res.end(JSON.stringify(answers["answer"+req.params.id]))
    })
})
//Delete
router.delete('/deleteAnswer/:id',function (req,res){
    fs.readFile(path,'utf8',function (err,data){
        var answers = JSON.parse(data)
        delete answers["answer"+req.params.id]
        fs.writeFile(path,JSON.stringify(answers),'utf8',function (err){
            if(err){
                return console.log(err)
            }
        })
        res.end(JSON.stringify(answers))
    })
})

module.exports = router