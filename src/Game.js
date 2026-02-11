import { Snake } from './Snake.js';
import { IventListner } from './IventListner.js';
import { FoodManager } from './FoodManager.js';
import { MAP_WIDTH } from './script.js';
import { MAP_HEIGHT } from './script.js';
import { CELL_SIZE } from './script.js';




export class Game {
    constructor() {
        this.snake = new Snake(CELL_SIZE, CELL_SIZE, this);
        this.listner = new IventListner(this);
        this.foodManager = new FoodManager(this);
        this.lastKeyPressed = "";
    }

    update() {
        this.snake.update();
        this.foodManager.update();
    }

    draw(context, progress) {
        this.snake.draw(context, progress);
        this.foodManager.draw(context);
    }

    drawBackground(context) {
        let swtch = false;
        let y = 0;
        for (let j = 0; j < MAP_HEIGHT / CELL_SIZE; j++) {
            let x = 0;
            for (let i = 0; i < MAP_WIDTH / CELL_SIZE; i++) {
                context.fillStyle = (swtch) ? "blue" : "lightblue";
                context.fillRect(x, y, CELL_SIZE, CELL_SIZE);
                swtch = !swtch;
                x += CELL_SIZE;
            }
            y += CELL_SIZE;
            // swtch = !swtch;
        }
    }

    reset() {
        this.snake = new Snake(CELL_SIZE, CELL_SIZE, this);
        this.lastKeyPressed = "";
    }
}
