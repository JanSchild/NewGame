import { SocketManager } from "./SocketManager.js";
import { GameLoop } from "./GameLoop.js";

SocketManager.startSocket();
GameLoop.start();