const socket = io.connect("ws://localhost:9999");

socket.on("open", () => {
    console.log("client connected")
})