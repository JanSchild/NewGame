import { INITIAL_SNAKE_LENGTH } from "../shared/constants.js";
import { SnakeSpawner } from "../shared/SnakeSpawner.js";
import { SnakeState } from "../shared/SnakeState.js";

export class MySnake {
    static #snake: SnakeState | undefined;

    static createSnake(snakeSpawner: SnakeSpawner, snakeId: string): void {
        let mySnakeNullable: SnakeState | null = snakeSpawner.tryToSpawnSnake(snakeId, INITIAL_SNAKE_LENGTH, 1000);
        if (!mySnakeNullable) {
            throw new Error("Could not make snake!");
        }
        MySnake.#snake = mySnakeNullable;
    }

    static getSnake(): SnakeState {
        if (!MySnake.#snake) {
            throw new Error(`I have no snake`);
        }
        return MySnake.#snake;
    }
}