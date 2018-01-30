function Sun(x, y) {
  this.x = x
  this.y = y
  this.target = [x,y];
  this.rot = 0

  this.setTarget = function (x,y) {
    this.target = [x,y]
  }

  this.update = function () {
      this.x += (this.target[0] - this.x)*.05
      this.y += (this.target[1] - this.y)*.05

      this.rot = frameCount / 150
  }

  this.draw = function () {
      fill(255, 198, 30)

      let radius = 150
      for (var i = 0; i < 20; i++) {
          const a = 2 * Math.PI / 20 * i + this.rot

          const triWidth = .05

          const p1 = pointAtAngle(a, radius, this.x, this.y)
          const p2 = pointAtAngle(a + triWidth, radius * .95, this.x, this.y)
          const p3 = pointAtAngle(a - triWidth, radius * .95, this.x, this.y)


          beginShape()
          vertex(p1[0], p1[1])
          vertex(p2[0], p2[1])
          vertex(p3[0], p3[1])
          vertex(p1[0], p1[1])
          endShape()
      }

      ellipse(this.x, this.y, 250, 250)
  }
}

function Earth(sun) {
  this.sun = sun

  this.update = function (prog) {
      var d = 150

      this.nx = -Math.cos(prog) * d + this.sun.x
      this.ny = Math.cos(prog) * d + this.sun.y
  }

  this.draw = function () {
      fill(55, 101, 138)

      ellipse(this.nx, this.ny, 75, 75)
  }
}

function Star(x, y, r, i) {
  this.x = x
  this.y = y
  this.r = r
  this.i = i

  this.update = function () {
      this.r = this.r * Math.sin((frameCount / 50) + i) / 2 + 1.5
  }

  this.draw = function () {
      fill(248, 247, 242)

      ellipse(this.x, this.y, this.r, this.r)
  }
}

function Moon(earth) {
  this.earth = earth

  this.update = function (prog) {
      const d = 50

      this.nx = Math.cos(prog) * d + this.earth.nx
      this.ny = this.earth.ny
  }

  this.draw = function (draw) {
      fill(248, 247, 242)
      ellipse(this.nx, this.ny, 75/4, 75/4)
  }
}