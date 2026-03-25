export class ClientWorld {
    constructor(width, height) {
        this.snakes = new Map();
        this.width = width;
        this.height = height;
    }
    sync(states) {
        for (let state of states) {
            this.snakes.set(state.id, state);
        }
    }
    coordinateIsFree(x, y) {
        for (let snake of this.snakes.values()) {
            for (let segment of snake.segments) {
                if (segment.x === x && segment.y === y) {
                    return false;
                }
            }
        }
        return true;
    }
}
export let world = new ClientWorld(20, 15);
