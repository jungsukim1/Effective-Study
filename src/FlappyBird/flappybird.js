import {updateBird, setupBird} from './bird.js'

document.addEventListener("keypress", handleStart, {once: true})
const title = document.querySelector("[data-title]")

let lastTime

function update(time){
    if(lastTime == null){
        lastTime = time
        window.requestAnimationFrame(update)
        return
    }
    const delta = time - lastTime
    updateBird(delta)
    lastTime = time
    window.requestAnimationFrame(update)
}

function handleStart(){
    title.classList.add("hide")
    window.requestAnimationFrame(update)
}

function handleLose(){

}