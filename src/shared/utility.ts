export function randomNumberInRange(min: number, max: number) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

export function numberIsInRange(value: number, min: number, max: number) {
    return value >= min && value <= max;
}