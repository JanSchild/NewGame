import { SnakeState } from "../shared/SnakeState.js";
import { Direction, directionToVector, randomDirectionFromDirections } from "../shared/Direction.js";
import { SnakeSegment } from "../shared/SnakeSegment.js";
import { ServerWorld } from "./ServerWorld.js";
import { randomNumberInRange } from "../shared/utility.js";
import { Quadrant, quadrantFromCoordinates } from "../shared/Quadrant.js";
import { gameLogger } from "./logger.js";

export class SnakeSpawner {
    #world: ServerWorld;

    constructor(world: ServerWorld) {
        this.#world = world;
    }

    tryToSpawnSnake(id: string, length: number, maxTries: number): SnakeState | null {
        for (let i = 0; i < maxTries; i++) {
            try {
                let headX: number = randomNumberInRange(length - 1, this.#world.width - length);
                let headY: number = randomNumberInRange(length - 1, this.#world.height - length);

                let quadrant: Quadrant | undefined = quadrantFromCoordinates(headX, headY, this.#world.width, this.#world.height);
                if (!quadrant) {
                    continue;
                }
                let allowedDirections: Direction[] = this.#allowedSpawningDirectionsInQuadrant(quadrant);
                let direction: Direction | undefined = randomDirectionFromDirections(allowedDirections);
                if (!direction) {
                    continue;
                }

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

    #allowedSpawningDirectionsInQuadrant(quadrant: Quadrant): Direction[] {
        let allowedDirections: Direction[];
        switch (quadrant) {
            case "upperLeft":
                allowedDirections = ["right", "down"];
                break;
            case "upperRight":
                allowedDirections = ["left", "down"];
                break;
            case "lowerLeft":
                allowedDirections = ["right", "up"];
                break;
            case "lowerRight":
                allowedDirections = ["left", "up"];
                break;
            default:
                allowedDirections = [];
                gameLogger.fatal(`Cannot determine allowed spawning directions based on quadrant: ${JSON.stringify(quadrant)}`);
        }
        return allowedDirections;
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