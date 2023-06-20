// Steering Text Paths
// Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/59-steering-behaviors

let font;
let textInput = "LUGGAS";
let vehicles = [];
let fontSize = 1000;
const mouseRadius = 150;
function preload() {
  font = loadFont("sketches/SteeringBehaviors/AvenirNextLTPro-Demi.otf");
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  textFont(font);
  textAlign(CENTER, CENTER);

  background(51);
  // textFont(font);
  // textSize(192);
  // fill(255);
  // noStroke();
  // text('train', 100, 200);
  getUserInput();

  createPointsByText(textInput);
}
async function getUserInput() {
  var input = prompt("Please enter your name:");
  if (input.length > 0 && input.length < 25) textInput = input;
}
function draw() {
  background(51);
  for (let i = 0; i < vehicles.length; i++) {
    let v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
  if (mouseIsPressed) {
    for (let i = 0; i < vehicles.length; i++) {
      let v = vehicles[i];
      var x = mouseX - v.pos.x;
      var y = mouseY - v.pos.y;
      var vec = createVector(x, y);
      vec.normalize();
      const speed_ = 2;
      vec.mult(speed_);
      v.setForce(vec);
    }
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  createPointsByText(textInput);
}
function createPointsByText(text) {
  vehicles = [];
  // Continuously reduce the font size until it fits the canvas
  textSize(fontSize);
  while (textWidth(text) > width) {
    print(fontSize);
    fontSize--;
    textSize(fontSize);
  }
  fontSize--;

  let points = font.textToPoints(text, 0, 0, fontSize, {
    sampleFactor: 0.25,
  });
  let minX = 99999999;
  let minY = 99999999;
  let maxX = -9999999;
  let maxY = -9999999;

  for (var i = 0; i < points.length; i++) {
    let pt = points[i];
    if (pt.x < minX) {
      minX = pt.x;
    }
    if (pt.y < minY) {
      minY = pt.y;
    }
    if (pt.x > maxX) {
      maxX = pt.x;
    }
    if (pt.y > maxY) {
      maxY = pt.y;
    }
  }
  for (var i = 0; i < points.length; i++) {
    let pt = points[i];
    let vehicle = new Vehicle(
      pt.x + width / 2 - (minX + maxX) / 2,
      pt.y + height / 2 - (minY + maxY) / 2
    );
    vehicles.push(vehicle);
  }
}
