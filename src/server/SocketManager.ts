import { WebSocket } from "ws";
import { wsLogger } from "./logger.js";
import { ClientMessage, ServerMessage } from "../shared/messages.js";

export class SocketManager {
    static sockets: Map<string, WebSocket> = new Map();

    static addSocket(socket: WebSocket) {
        let clientId: string = SocketManager.generateClientId();
        let existingSocket: WebSocket | undefined = this.sockets.get(clientId);
        if (existingSocket) {
            existingSocket.close(1000, "replaced by new connection");
        }
        SocketManager.sockets.set(clientId, socket);
        SocketManager.setupEventListeners(clientId, socket);
        SocketManager.sendWelcomeMessage(clientId, socket);
    }

    static generateClientId(): string {
        let clientId: string = `id-${Math.round(Math.random() * 100)}`;
        wsLogger.info(`Assigned new client ID: ${clientId}`);
        return clientId;
    }

    static sendWelcomeMessage(clientId: string, socket: WebSocket) {
        let welcomeMessage: ServerMessage = {
            type: "welcome",
            payload: {
                clientId
            }
        }
        SocketManager.sendMessage(socket, welcomeMessage);
    }

    static sendMessage(socket: WebSocket, message: ServerMessage) {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message));
            wsLogger.debug(`Server has sent message: ${JSON.stringify(message)}`);
        } else {
            wsLogger.error(`Server could not send message because socket is not open. Socket state: ${socket.readyState}`);
        }
    }

    static setupEventListeners(clientId: string, socket: WebSocket) {
        socket.on("message", (data) => {
            let dataString: string = data.toString();
            let message: ClientMessage = JSON.parse(dataString);
            wsLogger.trace(`Received message: ${JSON.stringify(message)}`);
        });

        socket.on("close", (code, reason) => {
            wsLogger.info(`Connection closed with code: ${code} and reason: ${reason.toString()}`);
            SocketManager.removeSocket(clientId);
        });

        socket.on("error", (err) => {
            wsLogger.error(`Socket error: ${err.message}`);
        });
    }

    static removeSocket(clientId: string) {
        SocketManager.sockets.delete(clientId);
    }
}