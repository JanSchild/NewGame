import { SnakeSegment } from "../shared/SnakeSegment.js";
import { SnakeState } from "../shared/SnakeState.js";
import { Boundaries } from "../shared/Boundaries.js";
import { ServerWorld } from "./ServerWorld.js";

export class SnakeCollider {
    #world: ServerWorld;

    constructor(world: ServerWorld) {
        this.#world = world;
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

    getCollidedSnakes(): Set<SnakeState> {
        let collidedSnakes: Set<SnakeState> = new Set();
        for (let snake of this.#world.snakes.values()) {
            if (this.#snakeHasCollided(snake) || this.#snakeHasLeftMapBoundaries(snake)) {
                collidedSnakes.add(snake);
            }
        }
        return collidedSnakes;
    }
}