import { ClientMessage, ServerMessage } from "../shared/messages.js";
import { SnakeState } from "../shared/SnakeState.js";
import { GameLoop } from "./GameLoop.js";

export class SocketManager {
    static #socket: WebSocket | undefined;
    static #clientId: string | undefined;
    static #gameLoop: GameLoop;

    static startSocket(gameLoop: GameLoop) {
        SocketManager.#gameLoop = gameLoop;

        let wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
        let socket = new WebSocket(`${wsProtocol}//${window.location.host}`);

        console.log("starting socket: ", socket);
        SocketManager.setupEventListeners(socket);
    }

    static restartSocket() {
        if (!this.#socket) {
            console.error(`Cannot restart socket because there is no socket`);
            return;
        }
        this.#socket.close();
        SocketManager.startSocket(this.#gameLoop);
    }

    static getClientId(): string | undefined {
        if (!SocketManager.#clientId) {
            console.error(`clientId is undefined`);
            return undefined;
        }
        return SocketManager.#clientId;
    }

    static getSnake(): SnakeState | undefined {
        let clientId: string | undefined = SocketManager.getClientId();
        if (!clientId) {
            return undefined;
        }
        return this.#gameLoop.getSnake(clientId);
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
                case "initializeWorld":
                    let width: number = message.payload.width;
                    let height: number = message.payload.height;
                    this.#gameLoop.createWorld(width, height);
                    break;
                case "gameState":
                    this.#gameLoop.syncGameState(message.payload.snakes);
                    break;
                case "deaths":
                    this.#gameLoop.killSnakes(message.payload.clientIds);
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