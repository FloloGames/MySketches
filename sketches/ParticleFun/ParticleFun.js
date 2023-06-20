var canvas;
var particleImg; //PImage
var particles = [];
let wind;
let mouseControll = false;
let shrinkSpeed = 40;
let particleSize;

function preload() {
  particleImg = loadImage("./sketches/ParticleFun/particle.png");
}
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");

  imageMode(CENTER);
  background(0);

  particleSize = min(width, height) / 10;
  particleImg.resize(particleSize, particleSize);
  wind = createVector(0, 0);
}
function draw() {
  if (frameRate() < 20) {
    //random(particles.length)
    particles.splice(0, 1);
  }
  if (particles.length < 500) {
    var pc = color(random(255), random(255), random(255));
    var p = new Particle(mouseX, mouseY, random(TWO_PI), 100, pc);
    particles.push(p);
  }
  blendMode(BLEND);
  background(0);
  blendMode(ADD);
  print(frameRate());
  // loadPixels(); // Load the pixel data of the canvasw
  // for (let i = 0; i < pixels.length; i += 4) {
  //   pixels[i] = 0; // Red component
  //   pixels[i + 1] = 0; // Green component
  //   pixels[i + 2] = 0; // Blue component
  //   pixels[i + 3] = 255; // Alpha component (fully opaque)
  // }
  // updatePixels(); // Update the canvas with the modified pixel data

  for (let i = particles.length - 1; i >= 0; i--) {
    var p = particles[i];
    p.move();
    p.updateBrightness();
    if (p.isDead()) {
      particles.splice(i, 1); // Remove the particle at index i
    }
    p.show();
  }
  // wind.set(0, 0);
  //println(frameRate);
  // float minSpeedX = 0;
  // float minSpeedY = 0.5;
  // wind.x = map(mouseX, 0, width, -1, 1)*particleSize/100;
  //wind.y = map(mouseY, 0, height, -1, -0.5)*particleSize/100;
}
function mousePressed() {
  var r = random(255);
  var g = random(255);
  var b = random(255);

  for (let i = 0; i < 360; i += 4) {
    let a = radians(i);
    const range = 30;
    var pc = color(
      r + random(-range, range),
      g + random(-range, range),
      b + random(-range, range)
    );
    var p = new Particle(mouseX, mouseY, a, 100, pc);

    particles.push(p);
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function createImage_() {
  particleSize = min(width, height) / 7;
  let g = createGraphics(particleSize, particleSize);

  g.loadPixels();
  let x = g.width / 2;
  let y = g.height / 2;
  let maxDist = max(g.width, g.height) / 2;
  for (let i = 0; i < g.width; i++) {
    for (let j = 0; j < g.height; j++) {
      let index = i + j * g.width;
      let dist = maxDist; //dist(i, j, x, y); //sqrt((i - x) * (i - x) + (j - y) * (j - y)); //dist(i, j, x, y);
      let brightness = map(dist, 0, maxDist, 255, 0);

      g.pixels[index] = color(255, brightness);
    }
  }
  g.updatePixels();
  particleImage = g;
}
