import { activeKeys } from "./keys.js";
import { mySnake } from "./mySnake.js";
import { directionFromVector } from "../shared/Direction.js";
export let input = {
    up: false,
    down: false,
    left: false,
    right: false,
    sequence: 0
};
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
    if (input.left)
        dx--;
    if (input.right)
        dx++;
    let dy = 0;
    if (input.up)
        dy--;
    if (input.down)
        dy++;
    let direction = directionFromVector(dx, dy);
    if (!direction) {
        return;
    }
    mySnake.direction = direction;
}
