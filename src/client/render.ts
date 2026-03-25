import { ClientWorld } from "./ClientWorld.js";
import { TILE_SIZE } from "../shared/constants.js";

export function render(ctx: CanvasRenderingContext2D, world: ClientWorld) {
    let border = 1;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let snake of world.snakes.values()) {
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, world.width * TILE_SIZE, world.height * TILE_SIZE);
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