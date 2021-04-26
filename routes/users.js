var express = require('express');
var router =express.Router();
var fs = require('fs');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var path = "./public/database/users.json";

var id = 0;



//Create
router.post('/createUser',urlencodedParser,function (req,res) {

    fs.readFile(path,'utf8',function (err,data) {
        var users = JSON.parse(data);
        while (users["user"+id]) {
            id++;
        }
        users["user" + id] = {
            "id":id,
            "name": req.body.name,
            "roomId": parseInt(req.body.roomId),
            "role": req.body.role,
            "points": 0
        }
        fs.writeFile(path,JSON.stringify(users),'utf8',function (err) {
            if(err) {
                return console.log(err);
            }
        })
        console.log(users["user"+id])
        res.end(JSON.stringify(users["user"+id]))
    })
})
//Read
router.get('/users',function (req,res) {
    fs.readFile(path,'utf8',function (err,data) {
        var users = JSON.parse(data);
        res.end(JSON.stringify(users))
    })
})

router.get('/user/:id',function (req,res) {
    fs.readFile(path,'utf8',function (err,data) {
        var users = JSON.parse(data);
        var user = users["user"+req.params.id]
        res.end(JSON.stringify(user))
    })
})

router.get('/users/:roomId',function (req,res) {
    fs.readFile(path,'utf8',function (err,data) {
        console.log(data)
        var users = JSON.parse(data);
        var inRoom = {}
        for (var user in users) {
            if(users[user].roomId == parseInt(req.params.roomId)) {
                inRoom[user] = users[user];
            }
        }
        res.end(JSON.stringify(inRoom))
    })
})

router.get('/winner/:roomId',function (req,res){
    fs.readFile(path,'utf8',function (err,data) {
        var users = JSON.parse(data);
        var winner = {};
        var podium = []
        var count = 0
        for (var user in users) {
            if (users[user].roomId == req.params.roomId){
                podium.push(users[user])
            }
        }
        podium.sort((a,b)=>{a[1]-b[1]})
        for (var p in podium){

            if (count >= 3)break;
            winner["user"+p] = podium[p]
        }
        res.end(JSON.stringify(winner))
    })
})

//Update

router.patch('/increasePoints/:id',urlencodedParser,function (req,res){
    fs.readFile(path,'utf8',function (err,data) {
        var users = JSON.parse(data);
        users["user"+req.params.id].points += parseInt(req.body.points)
        fs.writeFile(path,JSON.stringify(users),'utf8',function (err){
            if(err){
                return console.log(err);
            }
        })
        res.end(JSON.stringify(users["user"+req.params.id]))
    })
})

router.patch('/resetPoints/:roomId',function (req,res){
    fs.readFile(path,'utf8',function (err,data) {
        var users = JSON.parse(data);
        for (var user in users) {
            if(users[user].roomId == req.params.roomId ) {
                users[user].points = 0;
            }
        }
        fs.writeFile(path,JSON.stringify(users),'utf8', function (err) {
            if (err){
                return console.log(err)
            }
        })
        res.end(JSON.stringify(users))
    })
})


//Delete
router.delete('/deleteUser/:id',function (req,res){
    fs.readFile(path, 'utf8',function (err,data){
        var users = JSON.parse(data);
        delete users["user" + req.params.id]
        fs.writeFile(path,JSON.stringify(users),'utf8',function (err) {
            if (err) {
                return console.log(err)
            }
        })
        res.end(JSON.stringify(users));
    })
})


module.exports = router
