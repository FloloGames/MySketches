class Particle {
  constructor(x, y, a, s, c_) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.setVel(a);

    this.brightness = 255;
    this.speed = s;
    this.color = c_;
    this.shrinkSpeed = 120;
  }
  setVel(a) {
    this.vel = p5.Vector.fromAngle(a);
  }
  show() {
    tint(
      color(
        red(this.color),
        green(this.color),
        blue(this.color),
        this.brightness
      )
    );
    image(particleImg, this.pos.x, this.pos.y);
  }
  move() {
    var v = this.vel.copy();
    var acc = wind.copy();
    //acc.add(PVector.random2D().mult(speed/1000));
    v.add(acc);
    v.mult(this.speed);
    v.mult(1 / frameRate());
    this.pos.add(v);
    //possivle bug is that particle stays out of the window ez fix
    //just if() for less than 0...
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }
  updateBrightness() {
    this.brightness = this.brightness - this.shrinkSpeed / frameRate();
  }
  isDead() {
    return (
      this.brightness <= 0 ||
      this.pos.x + particleSize / 2 < 0 ||
      this.pos.x - particleSize / 2 > width ||
      this.pos.y + particleSize / 2 < 0 ||
      this.pos.y - particleSize / 2 > height
    );
  }
}
