import { SnakeState } from "../shared/SnakeState.js";
import { ClientWorld } from "./ClientWorld.js";
import { ctx } from "./ctx.js";
import { sendInput } from "./input.js";
import { endKeyLoop } from "./keys.js";
import { render } from "./render.js";

export class GameLoop {
    #world: ClientWorld | undefined;

    start(): void {
        requestAnimationFrame(this.loop);
    }

    loop = () => {
        if (!this.#world) {
            requestAnimationFrame(this.loop);
            return;
        }

        sendInput();
        render(ctx, this.#world);
        endKeyLoop();
        requestAnimationFrame(this.loop);
    }

    createWorld(width: number, height: number) {
        this.#world = new ClientWorld(width, height);
    }

    syncGameState(snakes: SnakeState[]) {
        if (!this.#world) {
            return;
        }
        this.#world.sync(snakes);
    }

    killSnakes(clientIds: string[]) {
        if (!this.#world) {
            return;
        }
        for (let clientId of clientIds) {
            let snake: SnakeState | undefined = this.#world.snakes.get(clientId);
            if (!snake) {
                console.error(`Could not find snake with id:${clientId}`);
                continue;
            }
            this.#world.killSnake(snake);
        }
    }
}