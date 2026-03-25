import { SnakeState } from "./SnakeState.js";
import { Direction, directionToVector, randomDirection } from "./Direction.js";
import { world } from "../client/ClientWorld.js";
import { SnakeSegment } from "./SnakeSegment.js";

export class SnakeSpawner {
    static makeSnake(id: string, length: number): SnakeState | null {
        let maxTries: number = 1000;
        for (let i = 0; i < maxTries; i++) {
            try {
                let direction: Direction = randomDirection();
                let headX: number = Math.floor(Math.random() * world.width);
                let headY: number = Math.floor(Math.random() * world.height);
                let segments: SnakeSegment[] = this.#makeSegments(headX, headY, direction, length);
                for (let segment of segments) {
                    if (!world.coordinateIsFree(segment.x, segment.y)) {
                        throw new Error(`Coordinates are already taken. x: ${segment.x}, y: ${segment.y}`);
                    }
                    if (!world.coordinateIsWithinWorld(segment.x, segment.y)) {
                        throw new Error(`Coordinates are outside of world bounds. x: ${segment.x}, y: ${segment.y}`);
                    }
                }
                return { id, segments, direction };
            } catch {
                continue;
            }
        }
        return null;
    }

    static #makeSegments(headX: number, headY: number, direction: Direction, length: number): SnakeSegment[] {
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