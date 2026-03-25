import { world } from "./ClientWorld.js";
import { sendInput } from "./input.js"
import { endKeyLoop } from "./keys.js";
import { render } from "./render.js";
import { ctx } from "./ctx.js";
import { SnakeMover } from "../shared/SnakeMover.js";

let lastTime: number | null = null;

function loop(time: number): void {
    if (!lastTime) {
        lastTime = time;
    }
    let deltaTime: number = time - lastTime;
    lastTime = time;

    sendInput();
    SnakeMover.increaseMovementClock(deltaTime);
    render(ctx, world);
    endKeyLoop();
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
