const bird = document.querySelector('[data-bird')
const BIRD_SPEED = 0.5

export function setupBird(){
    setTop(window.innerHeight / 2)
}

export function updateBird(delta){
    setTop(getTop() + BIRD_SPEED * delta)
    console.log(getTop())
}

function setTop(top){
    bird.style.setProperty("--bird-top", top)
}

function getTop(){
    return parseFloat(getComputedStyle(bird).getPropertyValue("--bird-top"))
}