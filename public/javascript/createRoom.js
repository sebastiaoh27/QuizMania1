

var req = new XMLHttpRequest();





function createRoom() {

    var name = document.getElementById("roomName").value
    req.onreadystatechange = function() {
        if (req.readyState == XMLHttpRequest.DONE) {
            var res = JSON.parse(req.responseText)
            localStorage.setItem("pass",res.password)
        }
    }
    req.open("POST","http://localhost:9999/createRoom",true)
    var body = {
        "name":name
    }
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(body))
    document.getElementById("passwordContainer").style.visibility = "visible"
    document.getElementById("password").innerHTML = localStorage.getItem("pass")


}


function copyToClipboard() {
    var textArea = document.createElement("textarea")
    document.body.appendChild(textArea)
    var password = document.getElementById("password")
    textArea.value = password.innerHTML
    textArea.select()
    try {
        document.execCommand('copy');
    } catch (e) {
        console.log(e)
    }
    document.body.removeChild(textArea)
    
    
}
