import { WebSocket } from "ws";
import { wsLogger } from "./logger.js";
import { ClientMessage, ServerMessage } from "../shared/messages.js";
import { InputManager } from "./InputManager.js";
import { SnakeState } from "../shared/SnakeState.js";

export class SocketManager {
    #sockets: Map<string, WebSocket> = new Map();
    #inputManager: InputManager;

    constructor(inputManager: InputManager) {
        this.#inputManager = inputManager;
    }

    addSocket(socket: WebSocket): string {
        let clientId: string = this.generateClientId();
        let existingSocket: WebSocket | undefined = this.#sockets.get(clientId);
        if (existingSocket) {
            existingSocket.close(1000, "replaced by new connection");
        }
        this.#sockets.set(clientId, socket);
        this.setupEventListeners(clientId, socket); // TODO: clientId sollte als Argument reichen
        this.sendWelcomeMessage(clientId, socket);
        this.sendInitializeWorldMessage(socket);
        return clientId;
    }

    generateClientId(): string {
        let clientId: string = `id-${Math.round(Math.random() * 100)}`;
        wsLogger.info(`Assigned new client ID: ${clientId}`);
        return clientId;
    }

    sendWelcomeMessage(clientId: string, socket: WebSocket) {
        let welcomeMessage: ServerMessage = {
            type: "welcome",
            payload: {
                clientId
            }
        }
        this.sendMessage(socket, welcomeMessage);
    }

    sendInitializeWorldMessage(socket: WebSocket) {
        let initializeWorldMessage: ServerMessage = {
            type: "initializeWorld",
            payload: {
                width: 20,
                height: 15
            }
        }
        this.sendMessage(socket, initializeWorldMessage);
    }

    sendDeathMessage(deadSnakes: Set<SnakeState>): void {
        if (deadSnakes.size === 0) {
            return;
        }
        let deadSnakesArray: SnakeState[] = Array.from(deadSnakes.values());
        let clientIds: string[] = deadSnakesArray.map(snake => snake.id);
        let deathMessage: ServerMessage = {
            type: "deaths",
            payload: {
                clientIds
            }
        }
        this.sendMessageToAllClients(deathMessage);
    }

    sendGameState(snakes: SnakeState[]): void {
        if (snakes.length === 0) {
            return;
        }
        let gameStateMessage: ServerMessage = {
            type: "gameState",
            payload: {
                snakes
            }
        }
        this.sendMessageToAllClients(gameStateMessage);
    }

    sendMessage(socket: WebSocket, message: ServerMessage) {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message));
            //wsLogger.debug(`Server has sent message: ${JSON.stringify(message)}`);
        } else {
            wsLogger.error(`Server could not send message because socket is not open. Socket state: ${socket.readyState}`);
        }
    }

    sendMessageToAllClients(message: ServerMessage) {
        for (let socket of this.#sockets.values()) {
            this.sendMessage(socket, message);
        }
    }

    setupEventListeners(clientId: string, socket: WebSocket) {
        socket.on("message", (data) => {
            let dataString: string = data.toString();
            let message: ClientMessage = JSON.parse(dataString);
            wsLogger.trace(`Received message: ${JSON.stringify(message)}`);

            switch (message.type) {
                case "input":
                    this.#inputManager.setInput(clientId, message.payload.input);
                    break;
                default:
                    wsLogger.error(`Unhandled message type: ${message.type}`);
            }
        });

        socket.on("close", (code, reason) => {
            wsLogger.info(`Connection closed with code: ${code} and reason: ${reason.toString()}`);
            this.removeSocket(clientId);
        });

        socket.on("error", (err) => {
            wsLogger.error(`Socket error: ${err.message}`);
        });
    }

    removeSocket(clientId: string) {
        this.#sockets.delete(clientId);
    }
}