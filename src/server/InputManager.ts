import { InputState } from "../shared/InputState.js";
import { gameLogger } from "./logger.js";

export class InputManager {
    #inputs: Map<string, InputState> = new Map();

    setInput(clientId: string, input: InputState): void {
        this.#inputs.set(clientId, input);
    }

    getInputs(): Map<string, InputState> {
        return this.#inputs;
    }

    clearInputs(): void {
        this.#inputs.clear();
    }
}