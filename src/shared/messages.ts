import { InputState } from "./InputState.js";
import { SnakeState } from "./SnakeState.js";

export type ClientMessage =
    | {
        type: "requestName";
        payload: {
            playerName: string;
        }
    }
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
        type: "initializeWorld";
        payload: {
            width: number;
            height: number;
        }
    }
    | {
        type: "gameState";
        payload: {
            snakes: SnakeState[];
        }
    }
    | {
        type: "deaths";
        payload: {
            clientIds: string[];
        };
    }
    | {
        type: "playerJoined";
        payload: {
            clientId: string;
            playerName: string;
        }
    }
    | {
        type: "playerLeft";
        payload: {
            clientId: string;
        }
    }
    | {
        type: "requestNameResponse";
        payload: {
            denied: boolean;
            reason: string;
            playerName: string;
        }
    };