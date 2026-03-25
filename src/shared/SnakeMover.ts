import { directionToVector } from "./Direction.js";
import { SnakeSegment } from "./SnakeSegment.js";
import { SnakeState } from "./SnakeState.js";
import { world } from "../client/ClientWorld.js";

export class SnakeMover {
    static movementClock: number = 0;
    static timePerMovement: number = 250;

    static increaseMovementClock(deltaTime: number) {
        SnakeMover.movementClock += deltaTime;
        if (SnakeMover.movementClock >= SnakeMover.timePerMovement) {
            SnakeMover.movementClock -= SnakeMover.timePerMovement;
            SnakeMover.moveAllSnakes();
        }
    }

    static moveAllSnakes(): void {
        world.snakes.forEach(snake => {
            SnakeMover.moveForward(snake);
        })
    }

    static moveForward(snake: SnakeState): void {
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