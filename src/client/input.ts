import { InputState } from "../shared/InputState.js";
import { activeKeys } from "./keys.js";
import { mySnake } from "./mySnake.js";
import { Direction, directionFromVector, oppositeDirection } from "../shared/Direction.js";

export let input: InputState = {
    up: false,
    down: false,
    left: false,
    right: false,
    sequence: 0
}

export function sendInput() {
    if (activeKeys.size == 0) {
        return;
    }

    input.sequence++;

    input.up = activeKeys.has("ArrowUp");
    input.down = activeKeys.has("ArrowDown");
    input.left = activeKeys.has("ArrowLeft");
    input.right = activeKeys.has("ArrowRight");

    let dx = 0;
    if (input.left) dx--;
    if (input.right) dx++;

    let dy = 0;
    if (input.up) dy--;
    if (input.down) dy++;

    let direction: Direction | undefined = directionFromVector(dx, dy);
    if (!direction) {
        return;
    }
    if (direction == oppositeDirection(mySnake.direction)) {
        return;
    }
    mySnake.direction = direction;
}