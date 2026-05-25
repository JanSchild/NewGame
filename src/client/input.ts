import { InputState } from "../shared/InputState.js";
import { activeKeys, releasedKeys, triggeredKeys } from "./keys.js";
import { SocketManager } from "./SocketManager.js";
import { ClientMessage } from "../shared/messages.js";

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

    let message: ClientMessage = {
        type: "input",
        payload: {
            input
        }
    }
    SocketManager.sendMessage(message);
}