import {updateBird, setupBird, getBirdPos} from './bird.js'
import {updatePipes, setupPipes, getScore, getRect} from './pipe.js'

document.addEventListener("keypress", handleStart, {once: true})
const title = document.querySelector("[data-title]")
const subtitle = document.querySelector("[data-subtitle]")

let lastTime

function update(time){
    if(lastTime == null){
        lastTime = time
        window.requestAnimationFrame(update)
        return
    }
    const delta = time - lastTime
    updateBird(delta)
    updatePipes(delta)
    if(checkLose()) return handleLose()
    lastTime = time
    window.requestAnimationFrame(update)
}

function checkLose(){
    const birdPos = getBirdPos()
    const instidePipe = getRect().some(rect => collision(birdPos, rect))
    const outsideBound = birdPos.top < 0 || birdPos.bottom > window.innerHeight
    return outsideBound || instidePipe
}

function collision(rect1, rect2){
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top 
    )
        
}

function handleStart(){
    title.classList.add("hide")
    setupBird()
    setupPipes()
    lastTime = null
    window.requestAnimationFrame(update)
    
}

function handleLose(){
    setTimeout(() => {
        title.classList.remove("hide")
        subtitle.classList.remove("hide")
        subtitle.textContent = 'Score: ' + getScore()
        document.addEventListener("keypress", handleStart, {once: true})
    }, 100)
}