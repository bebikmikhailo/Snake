const canvas = document.getElementById("canvas");

canvas.width = 425; // 425
canvas.height = 375; // 375
const cell = 25; //25

const ctx = canvas.getContext("2d");










class InventListner {
    constructor(game) {
        this.game = game;
        window.addEventListener("keydown", (ev) => {
          this.game.lastKeyPressed = ev.key;
        })
    }
}


class Game {
    constructor() {
        this.snake = new Snake(cell, cell, this);
        this.listner = new InventListner(this);
        this.lastKeyPressed = "";
    }

    update() {
        this.snake.update();
    }

    draw(context) {
        this.snake.draw(context);
    }

    drawBackground() {
        let swtch = false;
        let y = 0;
        for (let j = 0; j < canvas.height / cell; j++) {
            let x = 0;
            for (let i = 0; i < canvas.width / cell; i++) {
                ctx.fillStyle = (swtch) ? "blue" : "lightblue";
                ctx.fillRect(x, y, cell, cell);
                swtch = !swtch;
                x += cell;
            }
            y += cell;
            // swtch = !swtch;
        }
    }

    reset() {
        this.snake = new Snake(cell, cell, this);
        this.lastKeyPressed = "";
    }
}


class Segment {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


class Snake {
    constructor(x, y, game) {
        this.game = game;
        this.height = 25;
        this.width = 25;
        this.speed = cell;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.color = "yellow";
        this.body = [new Segment(x, y), new Segment(0, cell)];
        this.moveDirection = "none";
    }

    update() {
        this.chooseMoveDirection();

        for (let i = 0; i < this.body.length - 1; i++) {
            this.body[i + 1].x = this.body[i].x;
            this.body[i + 1].y = this.body[i].y;
        }
        this.body[0].x += this.xSpeed;
        this.body[0].y += this.ySpeed;


        this.checkColisionWithMap();
    }

    draw(context) {
        context.fillStyle = this.color;
        this.body.forEach(segment => {
            context.beginPath();
            context.roundRect(segment.x, segment.y, this.width, this.height, 10);
            context.fill();
        });
    }

    checkColisionWithMap() {

        this.body.forEach(segment => {
            if ((segment.x + this.width > canvas.width || segment.x < 0) || (segment.y + this.height > canvas.height || segment.y < 0)) {
                this.game.reset();
            }
        })
    }

    chooseMoveDirection() {
        if (this.game.lastKeyPressed === "w" && this.moveDirection !== "Down") {
            this.moveDirection = "Up";
            this.ySpeed = -this.speed;
            this.xSpeed = 0;
        }
        else if (this.game.lastKeyPressed === "s" && this.moveDirection !== "Up") {
            this.moveDirection = "Down";
            this.ySpeed = this.speed;
            this.xSpeed = 0;
        }
        else if(this.game.lastKeyPressed === "d" && this.moveDirection !== "Left") {
            this.moveDirection = "Right";
            this.xSpeed = this.speed;
            this.ySpeed = 0;
        }   
        else if(this.game.lastKeyPressed === "a" && this.moveDirection !== "Right") {
            this.moveDirection = "Left";
            this.xSpeed = -this.speed;
            this.ySpeed = 0;
        }
    }
}


const game = new Game();

let lastTime = 0;
let timer = 0;
let interval = 200;

function animation(timeStamp = 0) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    timer += deltaTime;

    if (timer > interval) {
        game.update();    
        timer = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.drawBackground();
    game.draw(ctx);
    requestAnimationFrame(animation);
}

animation();
