import { SnakeSegment } from "./SnakeSegment.js";
import { SnakeState } from "./SnakeState.js";
import { ClientWorld } from "../client/ClientWorld.js";
import { Boundaries } from "./Boundaries.js";

export class SnakeCollider {
    #world: ClientWorld;

    constructor(world: ClientWorld) {
        this.#world = world;
    }

    checkAllSnakes(): void {
        for (let snake of this.#world.snakes.values()) {
            if (this.#snakeHasCollided(snake) || this.#snakeHasLeftMapBoundaries(snake)) {
                this.#world.killSnake(snake);
            }
        }
    }

    #snakeHasCollided(snake: SnakeState): boolean {
        if (snake.segments.length < 1) {
            throw new Error(`Snake with ID ${snake.id} has no length`);
        }
        let snakeHead: SnakeSegment = snake.segments[0];
        let segmentsAtCoordinate: Set<SnakeSegment> = this.#world.segmentsAtCoordinate(snakeHead.x, snakeHead.y);
        segmentsAtCoordinate.delete(snakeHead);
        return segmentsAtCoordinate.size > 0;
    }

    #snakeHasLeftMapBoundaries(snake: SnakeState): boolean {
        if (snake.segments.length < 1) {
            throw new Error(`Snake with ID ${snake.id} has no length`);
        }
        let snakeHead: SnakeSegment = snake.segments[0];
        let boundaries: Boundaries = this.#world.worldBoundaries();
        return !boundaries.containsPoint(snakeHead.x, snakeHead.y);
    }
}