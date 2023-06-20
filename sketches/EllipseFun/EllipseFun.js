function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  background(0, 255);
  blendMode(ADD);
}
function draw() {
  fill(255);
  stroke(255, 0, 0);
  strokeWeight(35);
  // ellipse(mouseX, mouseY, 50, 50);
  line(mouseX, mouseY, pmouseX, pmouseY);
  strokeWeight(30);
  stroke(255);
  line(mouseX, mouseY, pmouseX, pmouseY);
}
