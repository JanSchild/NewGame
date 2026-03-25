import { SnakeState } from "../shared/SnakeState.js";

export class ClientWorld {
    width: number;
    height: number;
    snakes: Map<string, SnakeState> = new Map();

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
}

export let world: ClientWorld = new ClientWorld(20, 15);
