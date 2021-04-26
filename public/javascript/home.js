const socket = io.connect("ws://localhost:9999");

socket.on("connect", () => {
    sessionStorage.setItem("roomsCreated",JSON.stringify([]))
    console.log("client connected")
})
