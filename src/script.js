import { Game } from './Game.js';

const canvas = document.getElementById("canvas");

canvas.width = 425; // 425
canvas.height = 375; // 375

const ctx = canvas.getContext("2d");


export const MAP_WIDTH = canvas.width; // map width
export const MAP_HEIGHT = canvas.height; // map height
export const FOOD_LIMIT = 10;
export const CELL_SIZE = 25; //25


const game = new Game();

let lastTime = 0;
let timer = 0;
let interval = 140;

function animation(timeStamp = 0) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    timer += deltaTime;

    if (timer > interval) {
        game.update();    
        timer = 0;
    }

    const progress = timer / interval;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.drawBackground(ctx);
    game.draw(ctx, progress);
    requestAnimationFrame(animation);
}

animation();
