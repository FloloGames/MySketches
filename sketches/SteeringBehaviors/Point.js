// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

class Vehicle {
  constructor(x, y) {
    this.home = createVector(random(width), random(height));
    this.pos = this.home.copy();
    this.target = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.r = 8;
    this.maxspeed = 13;
    this.maxforce = 1;
  }

  behaviors() {
    if (dist(this.pos.x, this.pos.y, mouseX, mouseY) < mouseRadius) {
      var x = this.pos.x - mouseX;
      var y = this.pos.y - mouseY;
      var vec = createVector(x, y);
      vec.normalize();

      this.applyForce(vec);
      return;
    }
    var arrive = this.arrive(this.target);

    arrive.mult(1);

    this.applyForce(arrive);
  }

  applyForce(f) {
    this.acc.add(f);
  }

  setForce(f) {
    this.acc.set(f);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  show() {
    stroke(255);
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);
  }

  arrive(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    var speed = this.maxspeed;
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxspeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  }

  flee(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if (d < 50) {
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }
}
