import { performance } from "node:perf_hooks";
import { ServerWorld } from "./ServerWorld.js";
import { SnakeCollider } from "./SnakeCollider.js";
import { SnakeMover } from "./SnakeMover.js";
import { SocketManager } from "./SocketManager.js";
import { SnakeState } from "../shared/SnakeState.js";
import { InputManager } from "./InputManager.js";
import { InputState } from "../shared/InputState.js";
import { gameLogger } from "./logger.js";

export class GameLoop {
    readonly #tickRate: number;
    readonly #fixedTimestep: number;
    readonly #maxSteps: number;

    #accumulator = 0;
    #previousTime = 0;

    #running = false;
    #paused = false;

    #socketManager: SocketManager;
    #inputManager: InputManager;
    #world: ServerWorld;
    #snakeMover: SnakeMover;
    #snakeCollider: SnakeCollider;

    constructor(socketManager: SocketManager, inputManager: InputManager, world: ServerWorld, snakeMover: SnakeMover, snakeCollider: SnakeCollider) {
        this.#tickRate = 60;
        this.#fixedTimestep = 1000 / this.#tickRate;
        this.#maxSteps = 5;

        this.#socketManager = socketManager;
        this.#inputManager = inputManager;
        this.#world = world;
        this.#snakeMover = snakeMover;
        this.#snakeCollider = snakeCollider;
    }

    start(): void {
        gameLogger.trace("GameLoop.start");
        if (this.#running) {
            return;
        }

        this.#running = true;
        this.#paused = false;

        this.#accumulator = 0;
        this.#previousTime = performance.now();

        this.#loop();
    }

    pause(): void {
        if (!this.#running || this.#paused) {
            return;
        }

        this.#paused = true;
    }

    resume(): void {
        if (!this.#running || !this.#paused) {
            return;
        }

        this.#paused = false;

        // Reset timing so we don't accumulate
        // a giant elapsed time while paused
        this.#previousTime = performance.now();

        this.#loop();
    }

    stop(): void {
        this.#running = false;
        this.#paused = false;
    }

    #loop(): void {
        if (!this.#running || this.#paused) {
            return;
        }

        const now = performance.now();

        let elapsed = now - this.#previousTime;

        // Prevent huge catch-up spikes
        if (elapsed > 250) {
            elapsed = 250;
        }

        this.#previousTime = now;

        this.#accumulator += elapsed;

        let steps = 0;

        while (this.#accumulator >= this.#fixedTimestep && steps < this.#maxSteps) {
            this.updateWorld(this.#fixedTimestep / 1000);

            this.#accumulator -= this.#fixedTimestep;

            steps++;
        }

        setImmediate(() => this.#loop());
    }

    updateWorld(seconds: number): void {
        let inputMap: Map<string, InputState> = this.#inputManager.getInputs();
        for (let [clientId, input] of inputMap) {
            if (!input) {
                gameLogger.fatal(`Trying to read input for client ${clientId}, but no value found.`);
                continue;
            }
            this.#world.setSnakeDirection(clientId, input);
        }
        this.#inputManager.clearInputs();
        this.#snakeMover.increaseMovementClock(seconds);
        this.#socketManager.sendGameState(Array.from(this.#world.snakes.values()));
        let collidedSnakes: Set<SnakeState> = this.#snakeCollider.getCollidedSnakes();
        this.#world.killSnakes(collidedSnakes);
        this.#socketManager.sendDeathMessage(collidedSnakes);
    }
}