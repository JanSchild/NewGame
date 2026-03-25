import { canvas } from "./canvas.js";

let ctxNullable = canvas.getContext("2d");
if (!ctxNullable) {
    throw new Error(`Could not get 2D context`);
}
export let ctx: CanvasRenderingContext2D = ctxNullable;
