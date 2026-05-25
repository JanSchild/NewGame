import { SnakeSegment } from "./SnakeSegment.js"
import { Direction } from "./Direction.js"

export interface SnakeState {
    id: string,
    segments: SnakeSegment[],
    direction: Direction
    // TODO: color, oder eher player.color? Die Farbe muss ja nicht jedes Mal mitgeschickt werden
}