const bird = document.querySelector('[data-bird')
const BIRD_SPEED = 0.30
const JUMP_DURATION = 200

let timeSinceLastJump = Number.POSITIVE_INFINITY
let flappyBird

function preload(){
    flappyBird = loadImage('FlappyBird.png')
}

export function setupBird(){
    setTop(window.innerHeight / 2)
    document.removeEventListener("keydown", handleJump)
    document.addEventListener("keydown", handleJump)

}

export function updateBird(delta){
    if (timeSinceLastJump < JUMP_DURATION){
        setTop(getTop() - BIRD_SPEED * delta)
    }else{
        setTop(getTop() + BIRD_SPEED * delta)
    }
    timeSinceLastJump += delta
}

export function getBirdPos(){
    return bird.getBoundingClientRect()
}

function setTop(top){
    bird.style.setProperty("--bird-top", top)
}

function getTop(){
    return parseFloat(getComputedStyle(bird).getPropertyValue("--bird-top"))
}

function handleJump(e){
    if (e.code !== "Space") return

    timeSinceLastJump = 0
}