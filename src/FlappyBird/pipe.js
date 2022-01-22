const HOLE_HEIGHT = 130
const PIPE_WIDTH = 50
const PIPE_INTERVAL = 1500
const PIPE_SPEED = .25
let pipes = []
let timeSinceLastPipe
let score

export function setupPipes(){
    document.documentElement.style.setProperty("--pipe-width", PIPE_WIDTH)
    document.documentElement.style.setProperty("--hole-height", HOLE_HEIGHT)
    pipes.forEach(pipe => pipe.remove())
    timeSinceLastPipe = PIPE_INTERVAL
    score = 0
}

export function updatePipes(delta){
    timeSinceLastPipe += delta

    if (timeSinceLastPipe > PIPE_INTERVAL){
        timeSinceLastPipe -= PIPE_INTERVAL
        createPipe()
    }
    
    pipes.forEach(pipe =>{
        if (pipe.left + PIPE_WIDTH < 0){
            score ++
            return pipe.remove()
        }
        pipe.left = pipe.left - delta * PIPE_SPEED
    })
}

export function getScore(){
    return score
}

export function getRect(){
    return pipes.flatMap(pipe => pipe.rects())
}

function createPipe(){
    const pipe = document.createElement("div")
    const topPipe = createPipeSegment("top")
    const bottomPipe = createPipeSegment("bottom")
    pipe.append(topPipe)
    pipe.append(bottomPipe)
    pipe.classList.add("pipe")
    pipe.style.setProperty(
        "--hole-top", 
        randomNumberBetween(
            HOLE_HEIGHT * 1.5, 
            window.innerHeight - HOLE_HEIGHT * 1.5
        )
    )

    const pipeElem = {
        get left() {
            return parseFloat(getComputedStyle(pipe).getPropertyValue("--pipe-left"))
        },
        set left(value){
            pipe.style.setProperty("--pipe-left", value)
        },
        remove(){
            pipes = pipes.filter(p => p !== pipe)
            pipe.remove()
        },
        rects(){
            return [
                topPipe.getBoundingClientRect(),
                bottomPipe.getBoundingClientRect(), 
            ]
        }
    }

    pipeElem.left = window.innerWidth
    document.body.append(pipe)
    pipes.push(pipeElem)
}

function createPipeSegment(pos){
    const segment = document.createElement("div")
    segment.classList.add("segment", pos)
    return segment
}

function randomNumberBetween(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}