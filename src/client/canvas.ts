import { GAME_CANVAS_ID } from "./constants.js";

let canvasNullable = document.getElementById(GAME_CANVAS_ID);
if (!canvasNullable) {
    throw new Error(`Could not find canvas with ID '${GAME_CANVAS_ID}'`);
}
if (!(canvasNullable instanceof HTMLCanvasElement)) {
    throw new Error(`Canvas has the wrong type: ${typeof canvasNullable}`);
}
export let canvas: HTMLCanvasElement = canvasNullable;

function resize(): void {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();

window.addEventListener("resize", resize);