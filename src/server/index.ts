import { wss } from "./wss.js";
import { wsLogger } from "./logger.js";

wss.on("connection", (socket) => {
    wsLogger.info("Client connected");

    socket.on("message", (data) => {
        wsLogger.info(`Received message: ${data.toString()}`);
    });

    socket.send("hello from server");
});
