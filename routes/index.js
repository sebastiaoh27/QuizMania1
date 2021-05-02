var express = require('express');
var router =express.Router();
var url = "QuizMania/public/"

router.get(url+'/', function (req,res,next) {

    console.log(url)
    res.sendFile("index.html",{root: "./public"})
})

router.get(url+'/createQuiz', function (req,res,next) {
    res.sendFile("createQuiz.html",{root: "./public"})
})

router.get(url+'/contact', function (req,res,next) {
    res.sendFile("contact.html",{root: "./public"})
})

router.get(url+'/createRoom', function (req,res,next) {
    res.sendFile("createRoom.html",{root: "./public"})
})

router.get(url+'/room', function (req,res,next) {
    res.sendFile("room.html",{root: "./public"})
})

router.get(url+'/hostRoom', function (req,res,next) {
    res.sendFile("hostRoom.html",{root: "./public"})
})

module.exports = router;
