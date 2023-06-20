class Computer {
  Computer(x, y) {
    this.pos = new VecInt(x, y);
    this.dir = new VecInt(0, -1);
    this.showPath = true;
    this.bodys = [];
    this.path = [];
  }
  findPath(g) {
    var pathfinding = new Pathfinding(
      this.pos.x,
      this.pos.y,
      foodPos.x,
      foodPos.y,
      g
    );
    this.path = pathfinding.searchPath();
    var d = pathfinding.getDir();
    if (d == null) return;
    this.dir.set(d);
  }
  move() {
    if (
      this.pos.x + this.dir.x >= gridSize ||
      this.pos.x + this.dir.x < 0 ||
      this.pos.y + this.dir.y >= gridSize ||
      this.pos.y + this.dir.y < 0
    ) {
      restart();
      return;
    }
    var lastPos = this.pos.copy();
    this.pos.add(dir);
    for (var i = 0; i < this.bodys.length; i++) {
      var curr = this.bodys.get(i).copy();
      this.bodys.get(i).set(lastPos);
      lastPos.set(curr);
    }
  }
  update() {
    //show(COMPUTER_BODY, COMPUTER_HEAD, grid);//so the pathfinding dont crash
    this.findPath(grid);
    this.move();
    this.checkCollision(bodys);
    //checkCollision(player.bodys);
    checkFoodCollision();
    //show(COMPUTER_BODY, COMPUTER_HEAD, grid);
    if (!this.showPath) return;
    strokeWeight(5);
    stroke(255);
    noFill();
    beginShape();
    for (var n in this.path) {
      vertex(n.i * cellSize + cellSize / 2, n.j * cellSize + cellSize / 2);
    }
    endShape();
  }
  show(body, head, g) {
    for (var i = 0; i < this.bodys.length; i++) {
      var v = this.bodys.get(i);
      g[v.x][v.y] = body;
    }
    g[this.pos.x][this.pos.y] = head;
  }
  checkFoodCollision() {
    if (foodPos.x == this.pos.x && foodPos.y == this.pos.y) {
      this.addBody();
      setFood();
    }
    for (var i = 0; i < this.bodys.length; i++) {
      var v = this.bodys.get(i);
      if (foodPos.x == v.x && foodPos.y == v.y) {
        this.addBody();
        setFood();
      }
    }
  }
  checkCollision(walls) {
    for (var v in walls) {
      if (this.pos.x == v.x && this.pos.y == v.y) {
        restart();
      }
    }
  }
  addBody() {
    this.bodys.add(new VecInt(pos));
  }
  setDirection(v) {
    //if v is = to up and dir is = to down
    //than we cant go up
    if (this.dir.x * -1 == v.x || this.dir.y * -1 == v.y) return;
    this.dir.set(v);
  }
}
