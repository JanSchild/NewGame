import { SnakeCollider } from "../shared/SnakeCollider.js";
import { SnakeMover } from "../shared/SnakeMover.js";
import { SnakeSpawner } from "../shared/SnakeSpawner.js";
import { ClientWorld } from "./ClientWorld.js";
import { ctx } from "./ctx.js";
import { sendInput } from "./input.js";
import { endKeyLoop } from "./keys.js";
import { MySnake } from "./mySnake.js";
import { render } from "./render.js";

export class GameLoop {
    #world: ClientWorld;
    #snakeSpawner: SnakeSpawner;
    #snakeMover: SnakeMover;
    #snakeCollider: SnakeCollider;
    #lastTime: number | undefined;

    constructor(world: ClientWorld) {
        this.#world = world;
        this.#snakeSpawner = new SnakeSpawner(world);
        this.#snakeMover = new SnakeMover(world, 250);
        this.#snakeCollider = new SnakeCollider(world);
    }

    start(): void {
        MySnake.createSnake(this.#snakeSpawner, "my-snake");
        this.#world.sync([MySnake.getSnake()]);
        requestAnimationFrame(this.loop);
    }

    loop = (time: number): void => {
        if (this.#lastTime === undefined) {
            this.#lastTime = time;
        }
        let deltaTime: number = time - this.#lastTime;
        this.#lastTime = time;

        sendInput();
        this.#snakeMover.increaseMovementClock(deltaTime);
        this.#snakeCollider.checkAllSnakes();
        render(ctx, this.#world);
        endKeyLoop();
        requestAnimationFrame(this.loop);
    }
}