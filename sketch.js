let milktea;

function preload() {
  milktea = loadImage('milktea-2.png')
}
class Ball {
  constructor(x, y, creationTime) {
    this.x = x;
    this.y = y;
    this.size = 25;
    this.dropped = false;
    this.ballColor = color(0); 
    this.creationTime = creationTime;
    this.vx = 0;
    this.vy = 0;
    this.gravity = 0.5;
  }

 update() {
  if (!this.dropped) {
    this.x = mouseX;
    this.y = mouseY;
    if (mouseIsPressed) {
      this.size = constrain(this.size + (millis() - this.creationTime) / 40, 25, 50);
    } else {
      this.creationTime = millis() - (int(this.size) * 20) + 500;
    }
    this.x = constrain(this.x, 100 + this.size / 2, width - this.size / 2 - 100);
    this.y = constrain(this.y, 100 + this.size / 2, height - this.size / 2 - 100); // Adjusted boundaries
  } else {
    this.x += this.vx;
    this.vy += this.gravity;
    this.y += this.vy;

    // Constrain within the yellow rectangle
    this.x = constrain(this.x, 150 + this.size / 2, 350 - this.size / 2);
    this.y = constrain(this.y, 110 + this.size / 2, 510 - this.size / 2);

    if (this.x <= 150 + this.size / 2 || this.x >= 350 - this.size / 2) {
      this.vx = -this.vx * 0.9;
    }
    if (this.y <= 110 + this.size / 2 || this.y >= 510 - this.size / 2) {
      this.vy = -abs(this.vy) * 0.9;
    }
  }
}

  display() {
    noStroke();
    fill(this.ballColor);
    ellipse(this.x, this.y, this.size, this.size);
  }

  collidesWith(other) {
    let distance = dist(this.x, this.y, other.x, other.y);
    return distance < (this.size / 2 + other.size / 2);
  }

  resolveCollision(other) {
    let overlap = (this.size / 2 + other.size / 2) - dist(this.x, this.y, other.x, other.y);
    let angle = atan2(this.y - other.y, this.x - other.x);
    this.x += cos(angle) * overlap / 2;
    this.y += sin(angle) * overlap / 2;
    other.x -= cos(angle) * overlap / 2;
    other.y -= sin(angle) * overlap / 2;
  }
}


let rectangleColor; 
let brownShade = 100; 
let balls = [];



function setup() {
  createCanvas(500, 700);
  background(204, 204, 255);
  balls.push(new Ball(mouseX, mouseY, millis()));
  

  rectangleColor = color(255); 
  
  window.addEventListener("keydown", keyPressed);
}

function draw() {
  background(204, 204, 255);
  image(milktea, 0 , 0 , 500, 700);
  
  // Remove the earliest ball if there are more than 30 balls
  if (balls.length > 20) {
    balls.shift(); // Remove the first ball (the earliest one)
  }

  fill(rectangleColor, 100);
  rect(150, 510, 200, -400);
  
  fill(315,100,100)
  rect(250,50,30,450)
  
  fill(255, 218, 221)
  rect(120,100,260,20)
  
  

  for (let ball of balls) {
    ball.update();
  }

  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      let ball1 = balls[i];
      let ball2 = balls[j];
      if (ball1.collidesWith(ball2)) {
        ball1.resolveCollision(ball2);
      }
    }
  }

  for (let ball of balls) {
    ball.display();
  }
}

function mouseReleased() {
  let lastBall = balls[balls.length - 1];
  lastBall.dropped = true;
  lastBall.vy = -5;
  balls.push(new Ball(mouseX, mouseY, millis()));
}

function keyPressed(event) {
  if (event.key === "t") {
    rectangleColor = color(139 + brownShade, 69 + brownShade, 19 + brownShade, 128);
  } else if (event.key === "m") {
    rectangleColor = color(255, 255, 255, 128);
  }
}






