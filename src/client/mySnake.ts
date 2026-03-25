import { INITIAL_LENGTH } from "../shared/constants.js";
import { SnakeSpawner } from "../shared/SnakeSpawner.js";
import { SnakeState } from "../shared/SnakeState.js";
import { world } from "./ClientWorld.js";

let mySnakeNullable: SnakeState | null = SnakeSpawner.makeSnake("my-snake", INITIAL_LENGTH);
if (!mySnakeNullable) {
    throw new Error("Could not make snake!");
}
export let mySnake: SnakeState = mySnakeNullable;

world.sync([mySnake]);