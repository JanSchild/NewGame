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

    getSnake(clientId: string): SnakeState | undefined {
        return this.snakes.get(clientId);
    }

    sync(snakes: SnakeState[]): void {
        for (let snake of snakes) {
            this.snakes.set(snake.id, snake);
        }
    }

    killSnake(snake: SnakeState): void {
        this.deadSnakes.set(snake.id, snake);
        this.snakes.delete(snake.id);
        setTimeout(() => { this.deadSnakes.delete(snake.id) }, 5000);
    }
}
