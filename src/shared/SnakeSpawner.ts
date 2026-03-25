import { SnakeState } from "./SnakeState.js";
import { Direction, randomDirection } from "./Direction.js";
import { world } from "../client/ClientWorld.js";
import { SnakeSegment } from "./SnakeSegment.js";

export class SnakeSpawner {
    static makeSnake(id: string, length: number): SnakeState | null {
        let maxTries: number = 1000;
        for (let i = 0; i < maxTries; i++) {
            let direction: Direction = randomDirection();
            let headX: number = Math.floor(Math.random() * world.width);
            let headY: number = Math.floor(Math.random() * world.height);
            let segments: SnakeSegment[] = this.#makeSegments(headX, headY, direction, length);
            for (let segment of segments) {
                if (!world.coordinateIsFree(segment.x, segment.y)) {
                    continue;
                }
            }
            return { id, segments, direction };
        }
        return null;
    }

    static #makeSegments(headX: number, headY: number, direction: Direction, length: number): SnakeSegment[] {
        let segments: SnakeSegment[] = [];
        let x: number = headX;
        let y: number = headY;
        while (length > 0) {
            segments.push({ x, y });
            switch (direction) {
                case "down":
                    y--;
                    break;
                case "up":
                    y++;
                    break;
                case "left":
                    x++;
                    break;
                case "right":
                    x--;
                    break;
                default:
                    throw new Error(`Unknown direction value: ${direction}`);
            }
            length--;
        }
        return segments;
    }
}