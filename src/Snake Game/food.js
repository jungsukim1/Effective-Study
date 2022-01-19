import { onSnake, expandSnake} from './snake.js'
import {randomGridPosition} from './grid.js'

let food = randomFoodPosition()
const EXPANSION_RATE = 1

export function update(){
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE)
        food = randomFoodPosition()
    }
}

export function draw(gameBorad){
        const foodElement = document.createElement('div')
        foodElement.style.gridRowStart = food.y
        foodElement.style.gridColumnStart = food.x
        foodElement.classList.add('food')
        gameBorad.appendChild(foodElement)
}

function randomFoodPosition(){
    let newFoodPosition
    while (newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}

