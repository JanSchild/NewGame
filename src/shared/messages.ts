import { Direction } from "./Direction.js";
import { InputState } from "./InputState.js";

export type ClientMessage =
    | {
        type: "input",
        payload: {
            input: InputState;
        }
    };

export type ServerMessage =
    | {
        type: "welcome";
        payload: {
            clientId: string;
        };
    }
    | {
        type: "death";
        payload: {
            playerId: string;
        };
    };