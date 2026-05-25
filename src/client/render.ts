import { ClientWorld } from "./ClientWorld.js";
import { TILE_SIZE } from "../shared/constants.js";

let border = 1;

export function renderLoadingScreen(ctx: CanvasRenderingContext2D) {
    let canvas: HTMLCanvasElement = ctx.canvas;

    // clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // text styling
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "12px Arial";

    // main text
    ctx.fillText("Connecting...", canvas.width / 2, canvas.height / 2);
}

export function renderGame(ctx: CanvasRenderingContext2D, world: ClientWorld) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    renderBackground(ctx, world);
    renderDeadSnakes(ctx, world);
    renderSnakes(ctx, world);
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