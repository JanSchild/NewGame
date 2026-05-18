import { wss as websocketServer } from "./wss.js";
import { wsLogger } from "./logger.js";
import { SocketManager } from "./SocketManager.js";

websocketServer.on("connection", (socket) => {
    wsLogger.info("Client connected");
    let clientId: string = `id-${Math.round(Math.random() * 100)}`;
    wsLogger.info(`Assigned new client ID: ${clientId}`);
    SocketManager.addSocket(clientId, socket);
});
