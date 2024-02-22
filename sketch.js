let balls = [];

let middle;

function setup() {
  createCanvas(600, 600);
  middle = createVector(width/2, height/2);
  for (let i = 0; i < 50; i++) {
    balls[i] = new ball(
      middle.x + random(-20, 20),
      middle.y + random(-20, 20)
    );
  }
  noStroke();
  fill(0);
  // frameRate(2);
}

function draw() {
  background(240);
  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].interactWithOtherBalls(balls, i);
    if (mouseIsOnCanvas()) {
      balls[i].runFromMouse();
    }
    balls[i].attractTo(middle, 100);
    balls[i].move();
  }
}

function randomMovement() {
  return createVector(
    random(-1, 1),
    random(-1, 1)
  );
}

function mouseIsOnCanvas() {
  return (mouseX > 10 && mouseX < width-10) &&
    (mouseY > 10 && mouseY < height-10);
}