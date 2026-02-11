import { Segment } from './Segment.js';
import { MAP_WIDTH } from './script.js';
import { MAP_HEIGHT } from './script.js';
import { CELL_SIZE } from './script.js';


export class Snake {
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
            if ((segment.x + this.width > MAP_WIDTH || segment.x < 0) || (segment.y + this.height > MAP_HEIGHT || segment.y < 0)) {
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