// classes
import { Board } from './Board.js';
import { Snake } from './Snake.js';
import { IventListner } from './IventListner.js';
import { FoodManager } from './FoodManager.js';
import { HUD } from '../ui/HUD.js';
import { ApiService } from './ApiService.js';
//

// constants
import { INTERVAL } from '../script.js';
//



export class Game {
    constructor() {
        this.board = new Board(this);
        this.snake = new Snake(this);
        this.listner = new IventListner(this);
        this.foodManager = new FoodManager(this);
        this.hud = new HUD(this);
        this.apiService = new ApiService(this);
        this.score = 0; // game score
        this.timer = 0; // game timer
        this.interval = INTERVAL;
        this.isRun = false;
        this.isGameEnding = false;
    }

    update() {
        this.snake.update();
        if (!this.isRun) return; // to prevent last frame food spawn when game is restarted;
        this.foodManager.update();
    }

    draw(context, progress) {
        this.board.draw(context);
        this.foodManager.draw(context);
        this.snake.draw(context, progress);
        this.hud.draw(context);
    }

    start() {
        this.isRun = true;
    }

    restart() {
        this.listner = new IventListner(this);
        this.snake = new Snake(this);
        this.foodManager = new FoodManager(this);
        this.isRun = true;
        this.score = 0;
        this.timer = 0;
        this.interval = INTERVAL;
        this.isGameEnding = false;
    }

    decreaseInterval(value) {
        this.interval -= value;
    }
}
