const canvas = document.getElementById("canvas");

canvas.width = 425; // 425
canvas.height = 375; // 375

const ctx = canvas.getContext("2d");

const FOOD_LIMIT = 10;
const CELL_SIZE = 25; //25








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
        this.snake = new Snake(CELL_SIZE, CELL_SIZE, this);
        this.listner = new InventListner(this);
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

    drawBackground() {
        let swtch = false;
        let y = 0;
        for (let j = 0; j < canvas.height / CELL_SIZE; j++) {
            let x = 0;
            for (let i = 0; i < canvas.width / CELL_SIZE; i++) {
                ctx.fillStyle = (swtch) ? "blue" : "lightblue";
                ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
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


class Segment {
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

class Snake {
    constructor(x, y, game) {
        this.game = game;
        this.height = 25;
        this.width = 25;
        this.speed = CELL_SIZE;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.color = "yellow";
        this.body = [new Segment(x, y), new Segment(0, CELL_SIZE)];
        this.moveDirection = "none";
        this.moveProgress = 0;
    }

    update() {
        this.chooseMoveDirection();


        // body
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].oldX = this.body[i].x;
            this.body[i].oldY = this.body[i].y;
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }

        // head
        this.body[0].oldX = this.body[0].x;
        this.body[0].oldY = this.body[0].y;
        this.body[0].x += this.xSpeed;
        this.body[0].y += this.ySpeed;


        this.checkColisionWithMap();
    }

    draw(context, progress) {
        context.fillStyle = this.color;
        this.body.forEach(segment => {

            const renderX = segment.oldX + (segment.x - segment.oldX) * progress;
            const renderY = segment.oldY + (segment.y - segment.oldY) * progress;

            context.beginPath();
            context.roundRect(renderX, renderY, this.width, this.height, 10);
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

    isColidesWithSnake(segment) {
        this.body.forEach(seg => {
            if (seg.x === segment.x && seg.y === segment.y) {
                return true;
            }
        })
        return false;
    }
}



class Food {
    constructor(score, speedBoost, segment) {
        this.score = score;
        this.speedBoost = speedBoost;
        this.segment = segment;
    }

    draw(context) {
        throw new Error("draw() is abstract method of Food class")
    }
}

class Apple extends Food{
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


class FoodManager {
    constructor(game) {
        this.game = game;
        this.food = [];
        this.foodLimit = FOOD_LIMIT;
    }


    //drows food
    draw(context) {
        this.food.forEach(food => {
            food.draw(context);
        })
    }

    // generates food
    update() {
        this.generateFood("Apple");
    }


    generateFood(foodType) {
        if (!this.isEnoughFoodOnMap()) {
            const foodSegment = Segment.getRandomSegment(canvas.width, canvas.height, CELL_SIZE);
            if (!this.game.snake.isColidesWithSnake(foodSegment)) {
                switch(foodType) {
                    case "Apple":
                        this.food.push(new Apple(foodSegment));
                        break;
                }
            }
        }

    }

    isEnoughFoodOnMap() {
        return this.food.length === this.foodLimit;
    }

}


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
    game.drawBackground();
    game.draw(ctx, progress);
    requestAnimationFrame(animation);
}

animation();
