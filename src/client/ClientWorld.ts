import { Boundaries } from "../shared/Boundaries.js";
import { SnakeSegment } from "../shared/SnakeSegment.js";
import { SnakeState } from "../shared/SnakeState.js";

export class ClientWorld {
    width: number;
    height: number;
    snakes: Map<string, SnakeState> = new Map();
    deadSnakes: Map<string, SnakeState> = new Map();

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    sync(states: SnakeState[]): void {
        for (let state of states) {
            this.snakes.set(state.id, state);
        }
    }

    coordinateIsFree(x: number, y: number): boolean {
        for (let snake of this.snakes.values()) {
            for (let segment of snake.segments) {
                if (segment.x === x && segment.y === y) {
                    return false;
                }
            }
        }
        return true;
    }

    coordinateIsWithinWorld(x: number, y: number): boolean {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    segmentsAtCoordinate(x: number, y: number): Set<SnakeSegment> {
        let collectedSegments: Set<SnakeSegment> = new Set();
        for (let snake of this.snakes.values()) {
            for (let segment of snake.segments) {
                if (segment.x === x && segment.y === y) {
                    collectedSegments.add(segment);
                }
            }
        }
        return collectedSegments;
    }

    killSnake(snake: SnakeState): void {
        world.deadSnakes.set(snake.id, snake);
        world.snakes.delete(snake.id);
    }

    worldBoundaries(): Boundaries {
        return new Boundaries(0, this.width - 1, 0, this.height - 1);
    }
}

export let world: ClientWorld = new ClientWorld(20, 15);
