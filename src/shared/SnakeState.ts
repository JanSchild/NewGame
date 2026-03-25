import { SnakeSegment } from "./SnakeSegment.js"
import { Direction } from "./Direction.js"

export interface SnakeState {
    id: string,
    segments: SnakeSegment[],
    direction: Direction
}