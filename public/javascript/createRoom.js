

var req = new XMLHttpRequest();

var create = false;
var url = "http://localhost:9999"


function createRoom() {
    sessionStorage.setItem("inRoom",false)
    sessionStorage.setItem("stage", "quiz")
    if (create) {
      var name = document.getElementById("roomName").value
      req.onreadystatechange = function() {
          if (req.readyState == XMLHttpRequest.DONE) {
              var res = JSON.parse(req.responseText)

              sessionStorage.setItem("room",JSON.stringify(res))
              var roomsCreated = JSON.parse(sessionStorage.getItem("roomsCreated"))
              roomsCreated.push(res.id)
              sessionStorage.setItem("roomsCreated",JSON.stringify(roomsCreated))
              document.getElementById("passwordContainer").style.visibility = "visible"
              sessionStorage.setItem("pass",res.password)
              document.getElementById("password").innerHTML = res.password
          }
      }
      req.open("POST",url+"/createRoom",true)
      var body = {
          "name":name
      }
      req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      req.send(JSON.stringify(body))


    } else {
        var name = document.getElementById("roomName").value
        req.onreadystatechange = function() {
            if (req.readyState == XMLHttpRequest.DONE) {
                var res = JSON.parse(req.responseText)
                if (res) {
                    sessionStorage.setItem("room",JSON.stringify(res))
                    location.href = '/room'
                } else {
                    alert("The room code is wrong or the room was deleted!")
                }

            }
        }
        if (name == ""){name = "fail"}
        req.open("GET",url+"/joinRoom/"+ name,true);
        req.send();
    }

}

function joinCreate() {

    if (document.getElementById("option-1").checked){
      document.getElementById("header").innerHTML = "Join Room"
      document.getElementById("roomInput").innerHTML = "Input room code..."
      document.getElementById("roomAction").innerHTML = "Join"
      document.getElementById("roomAction").style.backgroundColor = "red"
      document.getElementById("passwordContainer").style.visibility = "hidden"
      create = false
    } else if (document.getElementById("option-2").checked){
      document.getElementById("header").innerHTML = "Create Room"
      document.getElementById("roomInput").innerHTML = "Input room name..."
      document.getElementById("roomAction").innerHTML = "Create"
      document.getElementById("roomAction").style.backgroundColor = "rgb(100,255,218)"
      create = true
    }
}
