const w = window.innerWidth - 20
const h = window.innerHeight - 20

function pointAtAngle(a, r, x, y) {
    let nx = Math.sin(a) * r + x
    let ny = Math.cos(a) * r + y

    return [nx, ny]
}

let sun, earth, moon
let stars = []

const halfEarthCycle = 50 * Math.PI

function setup() {
    createCanvas(w, h)

    noStroke()

    for (var i = 0; i < 300; i++) {
        let rx = Math.random() * w
        let ry = Math.random() * h
        let r = Math.random() * 3
        stars.push(new Star(rx, ry, r, i))
    }


    sun = new Sun(w / 2, h / 2)
    earth = new Earth(sun)
    moon = new Moon(earth)
}

function keyPressed() {
    sun.setTarget(Math.random()*w,Math.random()*h)
}


function draw() {
    background(77, 80, 97)

    const frameToRad = map(frameCount, 0, 700, 0, 2 * Math.PI);
    const prog = frameToRad % 2 * Math.PI

    for (let star of stars) {
        star.update()
        star.draw()
    }

    sun.update()

    moon.update(prog)
    earth.update(prog)
    moon.draw()    
    earth.draw()

    sun.draw()

    if (prog > Math.PI) {
        earth.draw()
        moon.draw()
    }
}