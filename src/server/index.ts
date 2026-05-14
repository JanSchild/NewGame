import { wss } from "./wss.js";

wss.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("message", (data) => {
        console.log(data.toString());
    });

    socket.send("hello from server");
});
