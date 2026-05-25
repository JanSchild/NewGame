import { SocketManager } from "./SocketManager.js";
import { GameLoop } from "./GameLoop.js";

let gameLoop: GameLoop = new GameLoop();
gameLoop.start();

SocketManager.startSocket(gameLoop);

let restartButton: HTMLElement | null = document.getElementById("restartButton");
if (restartButton) {
    restartButton.onclick = event => {
        SocketManager.restartSocket();
    }
}