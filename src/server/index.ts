import { wss as websocketServer } from "./wss.js";
import { wsLogger } from "./logger.js";
import { SocketManager } from "./SocketManager.js";
import { GameLoop } from "./GameLoop.js";
import { InputManager } from "./InputManager.js";
import { ServerWorld } from "./ServerWorld.js";
import { SnakeMover } from "./SnakeMover.js";
import { SnakeCollider } from "./SnakeCollider.js";
import { SnakeSpawner } from "./SnakeSpawner.js";
import { SnakeState } from "../shared/SnakeState.js";

let inputManager: InputManager = new InputManager();
let socketManager: SocketManager = new SocketManager(inputManager);
let world: ServerWorld = new ServerWorld(20, 15);
let snakeMover: SnakeMover = new SnakeMover(world, 0.25);
let snakeCollider: SnakeCollider = new SnakeCollider(world);
let snakeSpawner: SnakeSpawner = new SnakeSpawner(world);
let gameLoop: GameLoop = new GameLoop(socketManager, inputManager, world, snakeMover, snakeCollider);

gameLoop.start();

websocketServer.on("connection", (socket) => {
    wsLogger.info("Client connected");
    let clientId = socketManager.addSocket(socket);
    let snakeNullable: SnakeState | null = snakeSpawner.tryToSpawnSnake(clientId, 5, 1000);
    if (!snakeNullable) {
        return;
    }
    world.addSnake(clientId, snakeNullable);
});
