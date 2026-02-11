import { Food } from './Food.js';

export class Apple extends Food{
    constructor(segment, radius = 5) {
        super(1, 1, segment);
        this.radius = radius;
    }

    draw(context) {
        context.beginPath();
        context.fillStyle = "red";
        context.arc(this.segment.x, this.segment.y, this.radius, 0, 2 * Math.PI);
        context.fill();
    }

}