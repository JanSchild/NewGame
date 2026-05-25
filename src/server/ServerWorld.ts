import { Boundaries } from "../shared/Boundaries.js";
import { Direction, directionFromVector, oppositeDirection } from "../shared/Direction.js";
import { InputState } from "../shared/InputState.js";
import { SnakeSegment } from "../shared/SnakeSegment.js";
import { SnakeState } from "../shared/SnakeState.js";
import { gameLogger } from "./logger.js";

export class ServerWorld {
    width: number;
    height: number;
    snakes: Map<string, SnakeState> = new Map();
    deadSnakes: Map<string, SnakeState> = new Map();

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    addSnake(clientId: string, snake: SnakeState) {
        this.snakes.set(clientId, snake);
    }

    setSnakeDirection(clientId: string, input: InputState): void {
        let snake: SnakeState | undefined = this.snakes.get(clientId);
        if (!snake) {
            gameLogger.error(`Can't find snake with id:${clientId}`);
            return;
        }

        let dx = 0;
        if (input.left) dx--;
        if (input.right) dx++;

        let dy = 0;
        if (input.up) dy--;
        if (input.down) dy++;

        let newDirection: Direction | undefined = directionFromVector(dx, dy);
        if (!newDirection) {
            gameLogger.error(`Can't get direction from dx:${dx} dy:${dy}`);
            return;
        }
        if (newDirection == oppositeDirection(snake.direction)) {
            return;
        }
        gameLogger.trace(`New direction: ${newDirection}`);
        snake.direction = newDirection;
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

    killSnakes(snakes: Set<SnakeState>) {
        for (let snake of snakes) {
            gameLogger.debug(`Killed snake with ID ${snake.id}`);
            this.deadSnakes.set(snake.id, snake);
            this.snakes.delete(snake.id);
        }
    }

    worldBoundaries(): Boundaries {
        return new Boundaries(0, this.width - 1, 0, this.height - 1);
    }
}
