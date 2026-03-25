import { SnakeSegment } from "./SnakeSegment.js";
import { SnakeState } from "./SnakeState.js";
import { world } from "../client/ClientWorld.js";
import { Boundaries } from "./Boundaries.js";

export class SnakeCollider {
    static checkAllSnakes(): void {
        for (let snake of world.snakes.values()) {
            if (SnakeCollider.snakeHasCollided(snake) || SnakeCollider.snakeHasLeftMapBoundaries(snake)) {
                world.killSnake(snake);
            }
        }
    }

    static snakeHasCollided(snake: SnakeState): boolean {
        if (snake.segments.length < 1) {
            throw new Error(`Snake with ID ${snake.id} has no length`);
        }
        let snakeHead: SnakeSegment = snake.segments[0];
        let segmentsAtCoordinate: Set<SnakeSegment> = world.segmentsAtCoordinate(snakeHead.x, snakeHead.y);
        segmentsAtCoordinate.delete(snakeHead);
        return segmentsAtCoordinate.size > 0;
    }

    static snakeHasLeftMapBoundaries(snake: SnakeState): boolean {
        if (snake.segments.length < 1) {
            throw new Error(`Snake with ID ${snake.id} has no length`);
        }
        let snakeHead: SnakeSegment = snake.segments[0];
        let boundaries: Boundaries = world.worldBoundaries();
        return !boundaries.containsPoint(snakeHead.x, snakeHead.y);
    }
}