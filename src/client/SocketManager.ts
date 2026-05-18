import { SERVER_PORT } from "../shared/constants.js";
import { ClientMessage, ServerMessage } from "../shared/messages.js";

export class SocketManager {
    static socket: WebSocket | null;
    static clientId: string | null;

    static startSocket() {
        let socket = new WebSocket(`ws://localhost:${SERVER_PORT}`);
        console.log("starting socket: ", socket);
        SocketManager.setupEventListeners(socket);
    }

    static setupEventListeners(socket: WebSocket) {
        socket.onopen = () => {
            console.log("Connected");
            SocketManager.socket = socket;
        };

        socket.onmessage = (event) => {
            let dataString: string = event.data.toString();
            let message: ServerMessage = JSON.parse(dataString);
            console.log(`Received message: ${JSON.stringify(message)}`);

            switch (message.type) {
                case "welcome":
                    SocketManager.clientId = message.payload.clientId;
                    break;
                default:
                    console.error(`Unhandled message type '${message.type}'`);
            }
        };

        socket.onclose = (event) => {
            console.log("Socket closed");
            SocketManager.socket = null;
        }

        //TODO: socket.onerror = (event) => { ... }
    }

    static sendMessage(message: ClientMessage) {
        if (!SocketManager.socket) {
            console.error(`Could not send message because there is no socket.`);
            return;
        }
        if (SocketManager.socket.readyState !== WebSocket.OPEN) {
            console.error(`Could not send message because socket is not open. Socket state: ${SocketManager.socket.readyState}`);
            return;
        }
        SocketManager.socket.send(JSON.stringify(message));
    }
}