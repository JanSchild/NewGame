import pino from "pino";

export let logger = pino({
    level: "trace",
    transport: {
        target: "pino-pretty"
    }
});

export let httpLogger = logger.child({
    area: "http"
});

export let wsLogger = logger.child({
    area: "websocket"
});

export let gameLogger = logger.child({
    area: "game"
});