import { SnakeCollider } from "../shared/SnakeCollider.js";
import { SnakeMover } from "../shared/SnakeMover.js";
import { world } from "./ClientWorld.js";
import { ctx } from "./ctx.js";
import { sendInput } from "./input.js";
import { endKeyLoop } from "./keys.js";
import { render } from "./render.js";

export class GameLoop {
    static lastTime: number | null = null;

    static start(): void {
        requestAnimationFrame(GameLoop.loop);
    }

    static loop(time: number): void {
        if (GameLoop.lastTime === null) {
            GameLoop.lastTime = time;
        }
        let deltaTime: number = time - GameLoop.lastTime;
        GameLoop.lastTime = time;

        sendInput();
        SnakeMover.increaseMovementClock(deltaTime);
        SnakeCollider.checkAllSnakes();
        render(ctx, world);
        endKeyLoop();
        requestAnimationFrame(GameLoop.loop);
    }
}