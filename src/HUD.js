import { Apple } from './Apple.js';
import { Segment } from './Segment.js';

export class HUD {
    constructor(game) {
        this.game = game;

    }

    draw(context) {
        context.fillStyle = "white";
        context.font = "24px Arial";
        context.fillText(`${this.game.score}`, 40, -14); // 50 -15 

        const apple = new Apple(new Segment(7.5, -35), 0.25); // 7.5 -15
        apple.draw(context);
    }
}