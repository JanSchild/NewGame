import { INITIAL_SNAKE_LENGTH } from "../shared/constants.js";
import { SnakeSpawner } from "../shared/SnakeSpawner.js";
import { SnakeState } from "../shared/SnakeState.js";
import { world } from "./ClientWorld.js";

let mySnakeNullable: SnakeState | null = SnakeSpawner.tryToMakeSnake("my-snake", INITIAL_SNAKE_LENGTH, 1000);
if (!mySnakeNullable) {
    throw new Error("Could not make snake!");
}
export let mySnake: SnakeState = mySnakeNullable;

world.sync([mySnake]);