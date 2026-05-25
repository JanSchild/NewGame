import { SocketManager } from "./SocketManager.js";
import { GameLoop } from "./GameLoop.js";

let gameLoop: GameLoop = new GameLoop();
gameLoop.start();

SocketManager.startSocket(gameLoop);
