import { wss } from "./wss.js";
import { wsLogger } from "./logger.js";
import { SocketManager } from "./SocketManager.js";

wss.on("connection", (socket) => {
    wsLogger.info("Client connected");
    let id: string = `id-${Math.round(Math.random() * 100)}`;
    wsLogger.info(`Assigned new client ID: ${id}`);
    SocketManager.addSocket(id, socket);
});
