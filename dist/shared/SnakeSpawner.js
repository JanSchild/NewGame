var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _SnakeSpawner_makeSegments;
import { randomDirection } from "./Direction.js";
import { world } from "../client/ClientWorld.js";
export class SnakeSpawner {
    static makeSnake(id, length) {
        let maxTries = 1000;
        for (let i = 0; i < maxTries; i++) {
            let direction = randomDirection();
            let headX = Math.floor(Math.random() * world.width);
            let headY = Math.floor(Math.random() * world.height);
            let segments = __classPrivateFieldGet(this, _a, "m", _SnakeSpawner_makeSegments).call(this, headX, headY, direction, length);
            for (let segment of segments) {
                if (!world.coordinateIsFree(segment.x, segment.y)) {
                    continue;
                }
            }
            return { id, segments, direction };
        }
        return null;
    }
}
_a = SnakeSpawner, _SnakeSpawner_makeSegments = function _SnakeSpawner_makeSegments(headX, headY, direction, length) {
    let segments = [];
    let x = headX;
    let y = headY;
    while (length > 0) {
        segments.push({ x, y });
        switch (direction) {
            case "down":
                y--;
                break;
            case "up":
                y++;
                break;
            case "left":
                x++;
                break;
            case "right":
                x--;
                break;
            default:
                throw new Error(`Unknown direction value: ${direction}`);
        }
        length--;
    }
    return segments;
};
