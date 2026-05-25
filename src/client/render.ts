import { ClientWorld } from "./ClientWorld.js";
import { TILE_SIZE } from "../shared/constants.js";

let border = 1;

export function render(ctx: CanvasRenderingContext2D, world: ClientWorld) {
    //console.log("render", world);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    renderBackground(ctx, world);
    renderSnakes(ctx, world);
    renderDeadSnakes(ctx, world);
}

function renderBackground(ctx: CanvasRenderingContext2D, world: ClientWorld) {
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, world.width * TILE_SIZE, world.height * TILE_SIZE);
}

function renderSnakes(ctx: CanvasRenderingContext2D, world: ClientWorld) {
    for (let snake of world.snakes.values()) {
        ctx.fillStyle = "royalBlue";
        for (let segment of snake.segments) {
            let x: number = segment.x * TILE_SIZE + border;
            let y: number = segment.y * TILE_SIZE + border;
            let width: number = TILE_SIZE - 2 * border;
            let height: number = TILE_SIZE - 2 * border;
            ctx.fillRect(x, y, width, height);
        }
    }
}

function renderDeadSnakes(ctx: CanvasRenderingContext2D, world: ClientWorld) {
    for (let snake of world.deadSnakes.values()) {
        ctx.fillStyle = "red";
        for (let segment of snake.segments) {
            let x: number = segment.x * TILE_SIZE + border;
            let y: number = segment.y * TILE_SIZE + border;
            let width: number = TILE_SIZE - 2 * border;
            let height: number = TILE_SIZE - 2 * border;
            ctx.fillRect(x, y, width, height);
        }
    }
}