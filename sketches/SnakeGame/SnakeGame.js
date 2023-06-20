const EMPTY = 0;
const PLAYER_BODY = 1;
const PLAYER_HEAD = 2;
const COMPUTER_BODY = 3;
const COMPUTER_HEAD = 4;
const FOOD = 5;

var cellSize;
var cols = 50;
var rows;
var canvas;
var grid = [];

var showGrid = true;

var computer;
var computer2;

var foodPos;
var tickTime = 0.05; //move Speed default: 0.15
var time_ = 0;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  //   blendMode(ADD);
  computer = new Computer(4, 10);
  foodPos = new VecInt(0, 0);
  cellSize = width / cols;
  rows = round(height / cellSize - 0.5);
  for (var i = 0; i < rows; i++) {
    grid.push([]);
    for (var j = 0; j < cols; j++) {
      grid[i].push(EMPTY);
    }
  }
  setFood();
}
function draw() {
  time_ += 1 / frameRate();
  print(time_);
  if (time_ < tickTime) return;
  time_ = 0;

  background(0);
  clearGrid();

  drawFood();
  // computer2.update();
  computer.update();
  computer.show(PLAYER_BODY, PLAYER_HEAD, grid);
  // computer2.show(COMPUTER_BODY, COMPUTER_HEAD, grid);

  drawGrid(); //must be called at last
}
function draw() {
  background(0);
  noFill();
  stroke(255);
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var x = j * cellSize;
      var y = i * cellSize;
      rect(x, y, cellSize, cellSize);
    }
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  grid = [];
  cellSize = min(width, height) / 30;
  cols = width / cellSize - 0.5;
  rows = height / cellSize - 0.5;
  for (var i = 0; i < rows; i++) {
    grid.push([]);
    for (var j = 0; j < cols; j++) {
      grid[i].push(0);
    }
  }
  print(grid);
}
function drawGrid() {
  if (showGrid) {
    strokeWeight(0.5);
    stroke(255, 100);
  } else {
    noStroke();
  }
  for (var i = 0; i < gridSize; i++) {
    for (var j = 0; j < gridSize; j++) {
      var cellType = grid[i][j];
      if (cellType == EMPTY) {
        noFill();
        rect(
          i * cellSize + cellSize / 2,
          j * cellSize + cellSize / 2,
          cellSize,
          cellSize
        );
      } else if (cellType == PLAYER_BODY) {
        fill(PLAYER_BODY_COLOR);
        rect(
          i * cellSize + cellSize / 2,
          j * cellSize + cellSize / 2,
          cellSize,
          cellSize
        );
      } else if (cellType == PLAYER_HEAD) {
        fill(PLAYER_HEAD_COLOR);
        rect(
          i * cellSize + cellSize / 2,
          j * cellSize + cellSize / 2,
          cellSize,
          cellSize,
          10,
          10,
          10,
          10
        );
      } else if (cellType == COMPUTER_BODY) {
        fill(COMPUTER_BODY_COLOR);
        rect(
          i * cellSize + cellSize / 2,
          j * cellSize + cellSize / 2,
          cellSize,
          cellSize
        );
      } else if (cellType == COMPUTER_HEAD) {
        fill(COMPUTER_HEAD_COLOR);
        rect(
          i * cellSize + cellSize / 2,
          j * cellSize + cellSize / 2,
          cellSize,
          cellSize,
          10,
          10,
          10,
          10
        );
      } else if (cellType == FOOD) {
        fill(FOOD_COLOR);
        rect(
          i * cellSize + cellSize / 2,
          j * cellSize + cellSize / 2,
          cellSize,
          cellSize,
          10,
          10,
          10,
          10
        );
      }
    }
  }
}
function drawFood() {
  grid[foodPos.x][foodPos.y] = FOOD;
}
function clearGrid() {
  for (var i = 0; i < gridSize; i++) {
    for (var j = 0; j < gridSize; j++) {
      grid[i][j] = EMPTY;
    }
  }
}
function setFood() {
  foodPos.set(floor(random(cols)), floor(random(rows)));
}
