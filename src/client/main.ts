import { SocketManager } from "./SocketManager.js";
import { GameLoop } from "./GameLoop.js";
import { ClientWorld } from "./ClientWorld.js";

SocketManager.startSocket(); // TODO: callback functions (success, error)

let world: ClientWorld = new ClientWorld(20, 15);
let gameLoop: GameLoop = new GameLoop(world);
gameLoop.start();