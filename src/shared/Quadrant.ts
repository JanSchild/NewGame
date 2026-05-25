import { numberIsInRange } from "../shared/utility.js";

export let QUADRANTS = {
    upperLeft: { xStart: 0, xEnd: 0.5, yStart: 0, yEnd: 0.5 },
    upperRight: { xStart: 0.5, xEnd: 1, yStart: 0, yEnd: 0.5 },
    lowerLeft: { xStart: 0, xEnd: 0.5, yStart: 0.5, yEnd: 1 },
    lowerRight: { xStart: 0.5, xEnd: 1, yStart: 0.5, yEnd: 1 }
} as const;

export type Quadrant = keyof typeof QUADRANTS;

export function quadrantFromCoordinates(x: number, y: number, worldWidth: number, worldHeight: number): Quadrant | undefined {
    if (!numberIsInRange(x, 0, worldWidth) || !(numberIsInRange(y, 0, worldHeight))) {
        console.error(`Coordinates [${x}, ${y}] are not inside world bounds of width ${worldWidth} and height ${worldHeight}`)
        return undefined;
    }
    return (Object.keys(QUADRANTS) as Quadrant[]).find(quadrant => {
        let limits = QUADRANTS[quadrant];
        return x >= limits.xStart * worldWidth && x < limits.xEnd * worldWidth
            && y >= limits.yStart * worldHeight && y < limits.yEnd * worldHeight;
    });
}
