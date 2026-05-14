import { WebSocket } from "ws";
import { wsLogger } from "./logger.js";

export class SocketManager {
    static sockets: Map<string, WebSocket> = new Map();

    static addSocket(id: string, socket: WebSocket) {
        let existingSocket: WebSocket | undefined = this.sockets.get(id);
        if (existingSocket) {
            existingSocket.close(1000, "replaced by new connection");
        }
        SocketManager.sockets.set(id, socket);
        SocketManager.setupEventListeners(id, socket);
        SocketManager.sendMessage(socket, `hello from server socket with id ${id}`);
    }

    static sendMessage(socket: WebSocket, message: any) {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(message);
            wsLogger.debug(`Socket has sent message: ${message}`);
        } else {
            wsLogger.error(`Socket could not send message because it's not open. Socket state: ${socket.readyState}`);
        }
    }

    static setupEventListeners(id: string, socket: WebSocket) {
        socket.on("message", (data) => {
            wsLogger.info(`Received message: ${data.toString()}`);
        });

        socket.on("close", (code, reason) => {
            wsLogger.info(`Connection closed with code: ${code} and reason: ${reason.toString()}`);
            SocketManager.removeSocket(id);
        });

        socket.on("error", (err) => {
            wsLogger.error(`Socket error: ${err.message}`);
        });
    }

    static removeSocket(id: string) {
        SocketManager.sockets.delete(id);
    }
}