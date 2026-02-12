import { Segment } from './Segment.js';
import { MAP_WIDTH } from './script.js';
import { MAP_HEIGHT } from './script.js';
import { CELL_SIZE } from './script.js';
import { DECREASE_INTERVAL_VALUE } from './script.js';


export class Snake {
    constructor(x, y, game) {
        this.game = game;
        this.height = 25;
        this.width = 25;
        this.speed = CELL_SIZE;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.color = "yellow";
        this.body = [new Segment(x, y), new Segment(0, CELL_SIZE), new Segment(0, 0)];
        this.moveDirection = "None";
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

        // this.body[0] is snake's head and I check weather snake's head colides with food
        if (this.game.foodManager.isFoodEaten(this.body[0])) {
            this.game.score++;
            this.grow();
            this.increaseSpeed();
        }


        this.checkHeadColisionWithBody();
        this.checkColisionWithMap();
    }

    draw(context, progress) {
        context.fillStyle = this.color;
        this.body.forEach(segment => {

            const renderX = segment.oldX + (segment.x - segment.oldX) * progress;
            const renderY = segment.oldY + (segment.y - segment.oldY) * progress;

            context.beginPath();
            context.roundRect(renderX, renderY, this.width, this.height, 15);
            context.fill();
        });
    }


    // checks weather snake colides with map, if yes restarts game
    checkColisionWithMap() {
        this.body.forEach(segment => {
            if ((segment.x + this.width > MAP_WIDTH || segment.x < 0) ||
                (segment.y + this.height > MAP_HEIGHT || segment.y < 0)) {

                    this.game.restart();
                }
        });
    }

    chooseMoveDirection() {
        const lastKeyPressed = this.game.listner.getLastPressedKey();

        if (lastKeyPressed === "w" && this.moveDirection !== "Down") {
            this.moveDirection = "Up";
            this.ySpeed = -this.speed;
            this.xSpeed = 0;
        }
        else if (lastKeyPressed === "s" && this.moveDirection !== "Up") {
            this.moveDirection = "Down";
            this.ySpeed = this.speed;
            this.xSpeed = 0;
        }
        else if(lastKeyPressed === "d" && this.moveDirection !== "Left") {
            this.moveDirection = "Right";
            this.xSpeed = this.speed;
            this.ySpeed = 0;
        }   
        else if(lastKeyPressed === "a" && this.moveDirection !== "Right") {
            this.moveDirection = "Left";
            this.xSpeed = -this.speed;
            this.ySpeed = 0;
        }
    }

    isColidesWithSnake(segment) {
        return this.body.some(seg => {
            return Segment.isSegmentsColide(seg, segment);
        }); 
    }

    // to grow snake
    // adding a new segment as a new tail on position of old tail
    grow() {
        const oldTail = this.body[this.body.length - 1];
        const newTail = new Segment(oldTail.x, oldTail.y);

        newTail.oldX = oldTail.oldX;
        newTail.oldY = oldTail.oldY;

        this.body.push(newTail);
    }


    // checks weather snake's head colides with it's body, if yes restarts game
    checkHeadColisionWithBody() {
        const bodyWithOutHead = this.body.slice(1, this.body.length);
        const headSegment = this.body[0];

        bodyWithOutHead.forEach(segment => {
            if (Segment.isSegmentsColide(headSegment, segment)) {
                this.game.restart();
            }
        })
    }

    increaseSpeed() {
        this.game.decreaseInterval(DECREASE_INTERVAL_VALUE);
    }
 }
