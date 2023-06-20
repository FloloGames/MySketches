let purple; // raindrop purple color
let bgcolor;
let rain = [];
const numOfDrops = 1000; // total number of raindrops

var canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");

  purple = color(57, 70, 131); //color(138, 43, 226);
  bgcolor = color(197, 182, 200); //color(230, 230, 250, 150);
  for (let i = 0; i < numOfDrops; i++) {
    rain[i] = new Raindrop();
  }
}

function draw() {
  background(bgcolor);

  for (let drop of rain) {
    drop.fall();
    drop.draw();
    if (drop.hasFallen()) {
      drop.reset();
    }
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
