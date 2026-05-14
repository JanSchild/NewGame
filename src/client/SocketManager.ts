import { SERVER_PORT } from "../shared/constants.js";

export class SocketManager {
    static socket: WebSocket | null;

    static startSocket() {
        let socket = new WebSocket(`ws://localhost:${SERVER_PORT}`);
        console.log("starting socket: ", socket);
        SocketManager.setupEventListeners(socket);
    }

    static setupEventListeners(socket: WebSocket) {
        socket.onopen = () => {
            console.log("Connected");
            SocketManager.sendMessage("hello from client");
            SocketManager.socket = socket;
        };

        socket.onmessage = (event) => {
            console.log(`Received message: ${event.data}`);
        };

        socket.onclose = (event) => {
            console.log("Socket closed");
            SocketManager.socket = null;
        }
    }

    static sendMessage(message: any) {
        if (!SocketManager.socket) {
            return;
        }
        if (SocketManager.socket.readyState !== WebSocket.OPEN) {
            return;
        }
        SocketManager.socket.send(message);
    }
}