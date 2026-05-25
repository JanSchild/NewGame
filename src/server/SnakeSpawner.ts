import { SnakeState } from "../shared/SnakeState.js";
import { Direction, directionToVector, randomDirection } from "../shared/Direction.js";
import { SnakeSegment } from "../shared/SnakeSegment.js";
import { ServerWorld } from "./ServerWorld.js";

export class SnakeSpawner {
    #world: ServerWorld;

    constructor(world: ServerWorld) {
        this.#world = world;
    }

    tryToSpawnSnake(id: string, length: number, maxTries: number): SnakeState | null {
        for (let i = 0; i < maxTries; i++) {
            try {
                let direction: Direction = randomDirection();
                let headX: number = Math.floor(Math.random() * this.#world.width);
                let headY: number = Math.floor(Math.random() * this.#world.height);
                let segments: SnakeSegment[] = this.#makeSegments(headX, headY, direction, length);
                for (let segment of segments) {
                    if (!this.#world.coordinateIsFree(segment.x, segment.y)) {
                        throw new Error(`Coordinates are already taken. x: ${segment.x}, y: ${segment.y}`);
                    }
                    if (!this.#world.coordinateIsWithinWorld(segment.x, segment.y)) {
                        throw new Error(`Coordinates are outside of world bounds. x: ${segment.x}, y: ${segment.y}`);
                    }
                }
                return { id, segments, direction };
            } catch {
                console.error(`Attempt #${i + 1}: Failed to spawn snake.`);
                continue;
            }
        }
        return null;
    }

    #makeSegments(headX: number, headY: number, direction: Direction, length: number): SnakeSegment[] {
        let segments: SnakeSegment[] = [];
        let x: number = headX;
        let y: number = headY;
        let segmentsToMake: number = length;
        while (segmentsToMake > 0) {
            segments.push({ x, y });
            let { dx, dy } = directionToVector(direction);
            x -= dx;
            y -= dy;
            segmentsToMake--;
        }
        return segments;
    }
}