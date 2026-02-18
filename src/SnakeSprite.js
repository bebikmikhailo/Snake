import { CELL_SIZE } from './script.js';

export class SnakeSprite {
    constructor(snake, color, size) {
        this.snake = snake;
        this.color = color;
        this.size = size;
    }

    draw(context, progress) {
        this.drawBodyShade(context, progress);
        this.drawHeadShade(context, progress);
        this.drawBody(context, progress);
        this.drawHead(context, progress);
    }

    drawBodyPath(context, progress) {
        context.beginPath();
    
        const tail = this.snake.body[this.snake.body.length - 1];
        const tailX = tail.oldX + (tail.x - tail.oldX) * progress;
        const tailY = tail.oldY + (tail.y - tail.oldY) * progress;
        context.moveTo(tailX + CELL_SIZE / 2, tailY + CELL_SIZE / 2);
    
        for (let i = this.snake.body.length - 1; i > 0; i--) {
            const segment = this.snake.body[i];
            context.lineTo(segment.x + CELL_SIZE / 2, segment.y + CELL_SIZE / 2);
        }
    
        const head = this.snake.body[0];
        const headX = head.oldX + (head.x - head.oldX) * progress;
        const headY = head.oldY + (head.y - head.oldY) * progress;
        context.lineTo(headX + CELL_SIZE / 2, headY + CELL_SIZE / 2);
        
        context.stroke();  
    }

    drawBodyShade(context, progress) {
        context.save();
        context.shadowColor = 'rgba(0, 0, 0, 0.25)';
        context.shadowOffsetY = 10;

        context.lineCap = "round";
        context.lineJoin = "round";
        context.lineWidth = (CELL_SIZE * 1.7) * this.size;

        this.drawBodyPath(context, progress);
        context.restore();

    }

    drawBody(context, progress) {
        context.strokeStyle = this.color;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.lineWidth = (CELL_SIZE * 1.7) * this.size;

        this.drawBodyPath(context, progress);
    }


    drawHeadShade(context, progress) {
        const head = this.snake.body[0];

        const headX = head.oldX + (head.x - head.oldX) * progress;
        const headY = head.oldY + (head.y - head.oldY) * progress;

        let angle = 0;
        switch(this.snake.moveDirection) {
            case "Up":    angle = -Math.PI / 2; break; 
            case "Down":  angle = Math.PI / 2;  break; 
            case "Left":  angle = Math.PI;      break; 
            case "Right": angle = 0;            break; 
        }

        context.save();


        context.shadowColor = 'rgba(0, 0, 0, 0.25)';
        context.shadowOffsetY = 10;
        context.translate(headX + CELL_SIZE / 2, headY + CELL_SIZE / 2);
        context.scale(this.size, this.size);
        context.rotate(angle);
        

        context.beginPath();
        context.arc(0, 0, (CELL_SIZE * 1.3), 0, 2 * Math.PI);
        context.fill();

        context.restore();
        
    }

    drawHead(context, progress) {
        const head = this.snake.body[0];

        const headX = head.oldX + (head.x - head.oldX) * progress;
        const headY = head.oldY + (head.y - head.oldY) * progress;

        let angle = 0;
        switch(this.snake.moveDirection) {
            case "Up":    angle = -Math.PI / 2; break; 
            case "Down":  angle = Math.PI / 2;  break; 
            case "Left":  angle = Math.PI;      break; 
            case "Right": angle = 0;            break; 
        }

        context.save();

        context.translate(headX + CELL_SIZE / 2, headY + CELL_SIZE / 2);
        context.scale(this.size, this.size);
        context.rotate(angle);
        

        context.beginPath();
        context.fillStyle = this.color;
        context.arc(0, 0, (CELL_SIZE * 1.3), 0, 2 * Math.PI);
        context.fill();


        context.beginPath();
        context.fillStyle = `white`;

        context.arc(-20, 45, 40, 0, 2 * Math.PI);
        context.arc(-20, -45, 40, 0, 2 * Math.PI);
        context.fill();


        context.beginPath();
        context.fillStyle = `hsl(20, 100%, 20%)`;
        context.arc(-10, 45, 20, 0, 2 * Math.PI);
        context.arc(-10, -45, 20, 0, 2 * Math.PI);
        context.fill();


        context.beginPath();
        context.fillStyle = `hsl(20, 100%, 30%)`;
        context.arc(50, 20, 5, 0, 2 * Math.PI);
        context.arc(50, -20, 5, 0, 2 * Math.PI);
        context.fill();

        context.restore();
    }



}