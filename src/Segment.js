import { CELL_SIZE } from './script.js';

export class Segment {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.oldX = x;
        this.oldY = y;
    }

    static getRandomSegment(width, height, cellSize) {
        const x = (Math.floor(Math.random() * (width / cellSize)) * cellSize) + (CELL_SIZE / 2);
        const y = (Math.floor(Math.random() * (height / cellSize)) * cellSize) + (CELL_SIZE / 2);
        return new Segment(x, y);
    }
}