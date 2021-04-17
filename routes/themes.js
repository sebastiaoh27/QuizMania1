var express = require('express');
var router =express.Router();
var fs = require('fs');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var path = "./public/database/themes.json"

var id = 0;

//Create
router.post('/createTheme',urlencodedParser,function (req,res){
    fs.readFile(path,'utf8',function (err,data){
        var themes = JSON.parse(data)
        while (themes["theme"+id]) {
            id++;
        }
        themes["theme"+id] = {
            "id": id,
            "name": req.body.name
        }
        fs.writeFile(path,JSON.stringify(themes),'utf8',function (err){
            if(err){
                return console.log(err)
            }
        })
        res.end(JSON.stringify(themes["theme"+id]))
    })
})
//Read
router.get('/themes',urlencodedParser,function (req,res){
    fs.readFile(path,'utf8',function (err,data){
        var themes = JSON.parse(data)
        res.end(JSON.stringify(themes))
    })
})

router.get('/theme/:id',urlencodedParser,function (req,res){
    fs.readFile(path,'utf8',function (err,data){
        var themes = JSON.parse(data)
        var theme = themes["theme"+req.params.id]
        res.end(JSON.stringify(theme))
    })
})
//Update

router.patch('/editTheme/:id',urlencodedParser,function (req,res){
    fs.readFile(path,'utf8',function (err,data){
        var themes = JSON.parse(data)
        themes["theme"+req.params.id].name =req.body.name
        fs.writeFile(path,JSON.stringify(themes),'utf8',function (err){
            if(err){
                return console.log(err)
            }
        })
        res.end(JSON.stringify(themes["theme"+req.params.id]))
    })
})
//Delete

router.delete('/deleteTheme/:id',function (req,res){
    fs.readFile(path,'utf8',function (err,data){
        var themes = JSON.parse(data)
        delete themes["theme"+req.params.id]
        fs.writeFile(path,JSON.stringify(themes),'utf8',function (err){
            if(err){
                return console.log(err)
            }
        })
        res.end(JSON.stringify(themes))
    })
})



module.exports = router