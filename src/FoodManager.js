import { Segment } from './Segment.js';
import { Apple } from './Apple.js';
import { FOOD_LIMIT } from './script.js';
import { MAP_WIDTH } from './script.js';
import { MAP_HEIGHT } from './script.js';
import { CELL_SIZE } from './script.js';

export class FoodManager {
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
        while (!this.isEnoughFoodOnMap()) {
            const foodSegment = Segment.getRandomSegment(MAP_WIDTH, MAP_HEIGHT, CELL_SIZE);
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