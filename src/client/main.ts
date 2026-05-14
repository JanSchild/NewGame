import { world } from "./ClientWorld.js";
import { sendInput } from "./input.js"
import { endKeyLoop } from "./keys.js";
import { render } from "./render.js";
import { ctx } from "./ctx.js";
import { SnakeMover } from "../shared/SnakeMover.js";
import { SnakeCollider } from "../shared/SnakeCollider.js";
import { SERVER_PORT } from "../shared/constants.js";

let lastTime: number | null = null;

function loop(time: number): void {
    if (lastTime === null) {
        lastTime = time;
    }
    let deltaTime: number = time - lastTime;
    lastTime = time;

    sendInput();
    SnakeMover.increaseMovementClock(deltaTime);
    SnakeCollider.checkAllSnakes();
    render(ctx, world);
    endKeyLoop();
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);


let socket = new WebSocket(`ws://localhost:${SERVER_PORT}`);

console.log("socket: ", socket);

socket.onopen = () => {
    console.log("Connected");
    socket.send("hello from client");
};

socket.onmessage = (event) => {
    console.log(event.data);
};