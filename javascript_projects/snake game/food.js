import {OnSnake,expandSnake} from './snake.js'
import { randomGridPosition } from './grid.js'
let food = getRandomFoodPosition();
const EXPANSION_RATE = 1;

export function update() {
    if(OnSnake(food)) {
        expandSnake(EXPANSION_RATE);

        food = getRandomFoodPosition();
    }
}

export function draw(gameBoard) {
    var foodElement = document.createElement('div');
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
    let newFoodPosition;
    while(newFoodPosition == null || OnSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}