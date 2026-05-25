export let DIRECTIONS = {
    up: { dx: 0, dy: -1 },
    down: { dx: 0, dy: 1 },
    left: { dx: -1, dy: 0 },
    right: { dx: 1, dy: 0 }
} as const;

export type Direction = keyof typeof DIRECTIONS;

export function randomDirection(): Direction {
    let keys = Object.keys(DIRECTIONS) as Direction[];
    return keys[Math.floor(Math.random() * keys.length)]
}

export function randomDirectionFromDirections(allowedDirections: Direction[]): Direction | undefined {
    if (!allowedDirections || allowedDirections.length === 0) {
        console.error(`Cannot determine random direction from allowed directions: ${JSON.stringify(allowedDirections)}`);
        return undefined;
    }
    return allowedDirections[Math.floor(Math.random() * allowedDirections.length)];
}

export function directionFromVector(dx: number, dy: number): Direction | undefined {
    return (Object.keys(DIRECTIONS) as Direction[]).find(direction => {
        let vector = DIRECTIONS[direction];
        return vector.dx === dx && vector.dy === dy;
    });
}

export function directionToVector(direction: Direction) {
    return DIRECTIONS[direction];
}

export function oppositeDirection(direction: Direction): Direction {
    let { dx, dy } = directionToVector(direction);
    let oppositeDirection: Direction | undefined = directionFromVector(dx * (-1), dy * (-1));
    if (!oppositeDirection) {
        throw new Error(`Could not identify direction from dx: ${dx}, dy: ${dy}`);
    }
    return oppositeDirection;
}