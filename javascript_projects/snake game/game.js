import {update as updateSnake,draw as drawSnake,SNAKE_SPEED,getSnakeHead,snakeInterSection} from './snake.js'
import {update as updateFood,draw as drawFood} from './food.js'
import { outSideGrid } from './grid.js';
const gameBoard = document.getElementById('gameboard');
let lastRenderTime = 0;
let gameOver = false;



function main(currentTime) {
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if(secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime;
    
    if(gameOver) {
        if(confirm('you lost, press ok to restart')) {
            window.location = '/'
        } else {
            return
        }
    }
    update()
    draw()
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    checkDeath();
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = outSideGrid(getSnakeHead()) || snakeInterSection()
}