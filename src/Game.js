// classes
import { Snake } from './Snake.js';
import { IventListner } from './IventListner.js';
import { FoodManager } from './FoodManager.js';
import { HUD } from './HUD.js';
//

// constants
import { MAP_WIDTH } from './script.js';
import { MAP_HEIGHT } from './script.js';
import { CELL_SIZE } from './script.js';
import { INTERVAL } from './script.js';
//



export class Game {
    constructor() {
        this.snake = new Snake(CELL_SIZE, CELL_SIZE, this);
        this.listner = new IventListner(this);
        this.foodManager = new FoodManager(this);
        this.hud = new HUD(this);
        this.score = 0; // game score
        this.timer = 0; // game timer
        this.interval = INTERVAL;
        this.lastKeyPressed = "";
        this.isRun = false;
    }

    update() {
        this.snake.update();
        if (!this.isRun) return; // to prevent last frame food spawn when game is restarted;
        this.foodManager.update();
    }

    draw(context, progress) {
        this.snake.draw(context, progress);
        this.hud.draw(context);
        this.foodManager.draw(context);
    }

    drawBackground(context) {
        let isOdd = ((MAP_WIDTH / CELL_SIZE) % 2 === 0);
        let swtch = false;
        let y = 0;
        for (let j = 0; j < MAP_HEIGHT / CELL_SIZE; j++) {
            let x = 0;
            for (let i = 0; i < MAP_WIDTH / CELL_SIZE; i++) {
                context.fillStyle = (swtch) ? "#A7D2FF" : "#87C1FF";
                context.fillRect(x, y, CELL_SIZE, CELL_SIZE);
                swtch = !swtch;
                x += CELL_SIZE;
            }
            y += CELL_SIZE;
            if (isOdd) {
                swtch = !swtch;
            }
        }
    }

    start() {
        this.isRun = true;
    }

    restart() {
        this.isRun = false;
        this.snake = new Snake(CELL_SIZE, CELL_SIZE, this);
        this.foodManager = new FoodManager(this);
        this.score = 0;
        this.timer = 0;
        this.interval = INTERVAL;
        this.lastKeyPressed = "";
    }

    decreaseInterval(value) {
        this.interval -= value;
    }
}
