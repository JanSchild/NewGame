import { directionToVector } from "../shared/Direction.js";
import { SnakeSegment } from "../shared/SnakeSegment.js";
import { SnakeState } from "../shared/SnakeState.js";
import { ServerWorld } from "./ServerWorld.js";

export class SnakeMover {
    #world: ServerWorld;
    #movementClock: number;
    #timePerMovement: number;

    constructor(world: ServerWorld, timePerMovement: number) {
        this.#world = world;
        this.#movementClock = 0;
        this.#timePerMovement = timePerMovement;
    }

    increaseMovementClock(seconds: number) {
        this.#movementClock += seconds;
        if (this.#movementClock >= this.#timePerMovement) {
            this.#movementClock -= this.#timePerMovement;
            this.moveAllSnakes();
        }
    }

    moveAllSnakes(): void {
        this.#world.snakes.forEach(snake => {
            this.#moveForward(snake);
        });
    }

    #moveForward(snake: SnakeState): void {
        if (snake.segments.length < 1) {
            throw new Error(`Snake with ID ${snake.id} cannot move because it has no length`);
        }
        let { dx, dy } = directionToVector(snake.direction);
        let headSegment: SnakeSegment = snake.segments[0];
        let newHead: SnakeSegment = {
            x: headSegment.x + dx,
            y: headSegment.y + dy
        };
        snake.segments.unshift(newHead);
        snake.segments.pop();
    }
}