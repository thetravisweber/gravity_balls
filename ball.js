class ball {
  pos;
  size;
  velocity;
  forceCap = 10;

  constructor(x, y) {
    this.pos = createVector(x, y);
    this.velocity = createVector(0,0);
    this.size = random(10, 40);
  }

  draw() {
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }

  move() {
    this.applyForce(randomMovement());
    this.applyFriction();
    if (this.velocity.mag() > .1) this.pos.add(this.velocity);
  }

  applyFriction() {
    this.velocity.mult(.1);
  }

  interactWithOtherBalls(others, selfId) {
    others.forEach((other, index) => {
      if (index == selfId) return;
      let distance = p5.Vector.sub(this.pos, other.pos);
      if (distance.mag() < width/3) {
        this.repelFrom(other.pos, other.size);
      } else {
        this.attractTo(other.pos, other.size);
      }
    });
  }

  runFromMouse() {
    let mouseVector = createVector(mouseX, mouseY);
    let vectorToMouse = p5.Vector.sub(this.pos, mouseVector);
    if (vectorToMouse.mag() < this.size * 3) {
      this.repelFrom(mouseVector, 10**20 / vectorToMouse.mag());
    }
  }

  repelFrom(dilluter, strength=10) {
    let force = this.calculateForceToObject(dilluter, strength);
    force.mult(-1);
    this.applyForce(force);
  }

  attractTo(attractor, strength=10) {
    let force = this.calculateForceToObject(attractor, strength);
    this.applyForce(force);
  }

  calculateForceToObject(objectPosition, strength) {
    let difference = p5.Vector.sub(this.pos, objectPosition);
    let denom = difference.mag()**2
    let scale = -.1 * (this.size*strength) / denom;
    difference.mult(scale);
    return difference;
  }

  applyForce(force) {
    if (force.mag() > this.forceCap) {
      force.mult(this.forceCap/force.mag());
    }
    this.velocity.add(force);
  }
}