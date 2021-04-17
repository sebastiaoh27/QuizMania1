

function openMenu() {
    document.getElementById("title").style.zIndex = "0"
    document.getElementById("description").style.zIndex = "0"
    setTimeout(function () {
        document.getElementById("body").style.gridTemplateColumns = "0.25fr 1fr";
        var left = document.getElementById("left");
        left.style.width = "15%"
        left.style.visibility = "visible";
        document.getElementById("help").style.visibility = "visible";
        document.getElementById("home").style.visibility = "visible";
        document.getElementById("create-room").style.visibility = "visible";
        document.getElementById("contact").style.visibility = "visible";
    },200)


    document.getElementById("open-menu").style.visibility = "hidden";
    console.log("open")

}

function closeMenu() {
    document.getElementById("help").style.visibility = "hidden";
    document.getElementById("home").style.visibility = "hidden";
    document.getElementById("create-room").style.visibility = "hidden";
    document.getElementById("contact").style.visibility = "hidden";
    document.getElementById("body").style.gridTemplateColumns = "0fr 1fr";
    var left = document.getElementById("left")
    left.style.width = "0"
    setTimeout(function () {
        document.getElementById("title").style.zIndex = "2"
        document.getElementById("description").style.zIndex = "2"
        document.getElementById("open-menu").style.visibility = "visible";
    },200)

    console.log("close")
}

function goHome() {
    location.href = '/'
}
function goCreateRoom() {
    location.href = '/createRoom'
}
function goHelp() {
    location.href = '/help'
}
function goContact() {
    location.href = '/contact'
}