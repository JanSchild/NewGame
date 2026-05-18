import { wss as websocketServer } from "./wss.js";
import { wsLogger } from "./logger.js";
import { SocketManager } from "./SocketManager.js";

websocketServer.on("connection", (socket) => {
    wsLogger.info("Client connected");
    SocketManager.addSocket(socket);
});
