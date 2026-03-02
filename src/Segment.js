export class Segment {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.oldX = x;
        this.oldY = y;
    }

    static getRandomSegment(width, height, cellSize) {
        const x = Math.floor(Math.random() * (width / cellSize)) * cellSize;
        const y = Math.floor(Math.random() * (height / cellSize)) * cellSize;
        return new Segment(x, y);
    }

    static isSegmentsColide(segment1, segment2) {
        return (segment1.x === segment2.x && segment1.y === segment2.y);
    }
}