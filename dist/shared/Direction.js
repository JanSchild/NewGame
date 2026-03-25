export let DIRECTIONS = {
    up: { dx: 0, dy: -1 },
    down: { dx: 0, dy: 1 },
    left: { dx: -1, dy: 0 },
    right: { dx: 1, dy: 0 }
};
export function randomDirection() {
    let keys = Object.keys(DIRECTIONS);
    return keys[Math.floor(Math.random() * keys.length)];
}
export function directionFromVector(dx, dy) {
    return Object.keys(DIRECTIONS).find(dir => {
        let v = DIRECTIONS[dir];
        return v.dx === dx && v.dy === dy;
    });
}
export function directionToVector(direction) {
    return DIRECTIONS[direction];
}
