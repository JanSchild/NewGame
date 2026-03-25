import { world } from "./ClientWorld.js";
import { sendInput } from "./input.js";
import { endKeyLoop } from "./keys.js";
import { render } from "./render.js";
import { ctx } from "./ctx.js";
import { SnakeMover } from "../shared/SnakeMover.js";
let lastTime = null;
let timePerMovement = 250;
let movementClock = 0;
function loop(time) {
    if (!lastTime) {
        lastTime = time;
    }
    let deltaTime = time - lastTime;
    lastTime = time;
    movementClock += deltaTime;
    sendInput();
    if (movementClock >= timePerMovement) {
        movementClock -= timePerMovement;
        SnakeMover.moveAllSnakes();
    }
    render(ctx, world);
    endKeyLoop();
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
