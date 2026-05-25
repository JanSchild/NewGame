import { InputState } from "../shared/InputState.js";
import { activeKeys, releasedKeys, triggeredKeys } from "./keys.js";
import { SocketManager } from "./SocketManager.js";
import { ClientMessage } from "../shared/messages.js";
import { Direction, directionFromVector, oppositeDirection } from "../shared/Direction.js";
import { SnakeState } from "../shared/SnakeState.js";

export let input: InputState = {
    up: false,
    down: false,
    left: false,
    right: false
}

export function sendInput() {
    if (triggeredKeys.size === 0 && releasedKeys.size === 0) {
        return;
    }
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

    let newDirection: Direction | undefined = directionFromVector(dx, dy);
    if (!newDirection) {
        console.error(`Can't get direction from dx:${dx} dy:${dy}`);
        return;
    }

    let snake: SnakeState | undefined = SocketManager.getSnake();
    if (!snake) {
        return;
    }

    if (newDirection == oppositeDirection(snake.direction)) {
        return;
    }

    let message: ClientMessage = {
        type: "input",
        payload: {
            input
        }
    }
    SocketManager.sendMessage(message);
}