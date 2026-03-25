import { directionToVector } from "./Direction.js";
import { world } from "../client/ClientWorld.js";
export class SnakeMover {
    static moveAllSnakes() {
        world.snakes.forEach(snake => {
            SnakeMover.moveForward(snake);
        });
    }
    static moveForward(snake) {
        if (snake.segments.length < 1) {
            throw new Error(`Snake with ID ${snake.id} cannot move because it has no length`);
        }
        let { dx, dy } = directionToVector(snake.direction);
        let headSegment = snake.segments[0];
        let newHead = {
            x: headSegment.x + dx,
            y: headSegment.y + dy
        };
        snake.segments.unshift(newHead);
        snake.segments.pop();
    }
}
