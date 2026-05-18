import { directionToVector } from "./Direction.js";
import { SnakeSegment } from "./SnakeSegment.js";
import { SnakeState } from "./SnakeState.js";
import { ClientWorld } from "../client/ClientWorld.js";

export class SnakeMover {
    #world: ClientWorld;
    #movementClock: number;
    timePerMovement: number;

    constructor(world: ClientWorld, timePerMovement: number) {
        this.#world = world;
        this.#movementClock = 0;
        this.timePerMovement = timePerMovement;
    }

    increaseMovementClock(deltaTime: number) {
        this.#movementClock += deltaTime;
        if (this.#movementClock >= this.timePerMovement) {
            this.#movementClock -= this.timePerMovement;
            this.moveAllSnakes();
        }
    }

    moveAllSnakes(): void {
        this.#world.snakes.forEach(snake => {
            this.moveForward(snake);
        });
    }

    moveForward(snake: SnakeState): void {
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