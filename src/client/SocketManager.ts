import { SERVER_PORT } from "../shared/constants.js";
import { ClientMessage, ServerMessage } from "../shared/messages.js";

export class SocketManager {
    static #socket: WebSocket | undefined;
    static #clientId: string | undefined;

    static startSocket() {
        let socket = new WebSocket(`ws://localhost:${SERVER_PORT}`);
        console.log("starting socket: ", socket);
        SocketManager.setupEventListeners(socket);
    }

    static getClientId(): string {
        if (!SocketManager.#clientId) {
            throw new Error(`clientId is undefined`);
        }
        return SocketManager.#clientId;
    }

    static setupEventListeners(socket: WebSocket) {
        socket.onopen = () => {
            console.log("Connected");
            SocketManager.#socket = socket;
        };

        socket.onmessage = (event) => {
            let dataString: string = event.data.toString();
            let message: ServerMessage = JSON.parse(dataString);
            console.log(`Received message: ${JSON.stringify(message)}`);

            switch (message.type) {
                case "welcome":
                    SocketManager.#clientId = message.payload.clientId;
                    console.log(`ClientID: ${SocketManager.getClientId()}`);
                    break;
                default:
                    console.error(`Unhandled message type '${message.type}'`);
            }
        };

        socket.onclose = (event) => {
            console.log("Socket closed");
            SocketManager.#socket = undefined;
        }

        //TODO: socket.onerror = (event) => { ... }
    }

    static sendMessage(message: ClientMessage) {
        if (!SocketManager.#socket) {
            console.error(`Could not send message because there is no socket.`);
            return;
        }
        if (SocketManager.#socket.readyState !== WebSocket.OPEN) {
            console.error(`Could not send message because socket is not open. Socket state: ${SocketManager.#socket.readyState}`);
            return;
        }
        SocketManager.#socket.send(JSON.stringify(message));
    }
}