import { Game } from './Game.js';

const canvas = document.getElementById("canvas");

canvas.width = 425; // 425
canvas.height = 375; // 375

const ctx = canvas.getContext("2d");


export const MAP_WIDTH = canvas.width; // map width
export const MAP_HEIGHT = canvas.height; // map height
export const FOOD_LIMIT = 10;
export const CELL_SIZE = 25; //25
export const INTERVAL = 140;
export const DECREASE_INTERVAL_VALUE = 1;


const game = new Game();

let lastTime = 0;

function animation(timeStamp = 0) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    if (game.isRun) {
        game.timer += deltaTime;
        if (game.timer > game.interval) {
            game.update();    
            game.timer = 0;
        }
    }

    const progress = (game.interval === 0) ? 0 : game.timer / game.interval;

    ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
    game.drawBackground(ctx);
    game.draw(ctx, progress);

    requestAnimationFrame(animation);
}

animation();
