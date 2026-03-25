import { TILE_SIZE } from "../shared/constants.js";
export function render(ctx, world) {
    let border = 1;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let snake of world.snakes.values()) {
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, world.width * TILE_SIZE, world.height * TILE_SIZE);
        ctx.fillStyle = "royalBlue";
        for (let segment of snake.segments) {
            let x = segment.x * TILE_SIZE + border;
            let y = segment.y * TILE_SIZE + border;
            let width = TILE_SIZE - 2 * border;
            let height = TILE_SIZE - 2 * border;
            ctx.fillRect(x, y, width, height);
        }
    }
}
