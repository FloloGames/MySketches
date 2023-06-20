class Pathfinding {
  Pathfinding(x1, y1, x2, y2, g) {
    this.path = [];
    this.openList = [];
    this.closedList = [];
    this.myGrid = new Node[gridSize][gridSize]();

    for (var i = 0; i < gridSize; i++) {
      for (var j = 0; j < gridSize; j++) {
        myGrid[i][j] = new Node(i, j, EMPTY);
        myGrid[i][j].type = g[i][j];
      }
    }
    for (var i = 0; i < gridSize; i++) {
      for (var j = 0; j < gridSize; j++) {
        myGrid[i][j].addNeighbors(myGrid);
      }
    }

    this.start = myGrid[x1][y1];
    this.end = myGrid[x2][y2];
  }
  getDir() {
    //searchPath();
    if (this.path.size() > 1) {
      var vx = this.path.get(this.path.size() - 2).i - this.start.i;
      var vy = this.path.get(this.path.size() - 2).j - this.start.j;
      vx = constrain(vx, -1, 1);
      vy = constrain(vy, -1, 1);
      return new VecInt(vx, vy);
    }
    return null;
  }
  searchPath() {
    this.openList.clear();
    this.closedList.clear();

    this.openList.add(start);

    var current;

    const maxRounds = 99999;
    var rounds = 0;
    while (this.openList.size() > 0) {
      rounds++;
      if (rounds > maxRounds) return path;
      var winner = 0;
      for (var i = 0; i < this.openList.size(); i++) {
        if (this.openList.get(i).f < this.openList.get(winner).f) {
          winner = i;
        }
      }
      current = this.openList.get(winner);

      if (current == this.end) {
        this.path.clear();
        var temp = current;
        this.path.add(temp);
        while (temp.previous != null) {
          rounds++;
          if (rounds > maxRounds) return path;
          this.path.add(temp.previous);
          temp = temp.previous;
        }
        return path;
      }

      this.openList.remove(current);
      this.closedList.add(current);

      var neighbors = current.neighbors;
      for (var neighbor in neighbors) {
        if (
          closedList.contains(neighbor) == false &&
          neighbor.type != PLAYER_BODY &&
          neighbor.type != PLAYER_HEAD &&
          neighbor.type != COMPUTER_BODY &&
          neighbor.type != COMPUTER_HEAD
        ) {
          var tempG = current.g + heuristic(neighbor, current);
          var newPath = false;

          if (this.openList.contains(neighbor)) {
            if (tempG < neighbor.g) {
              neighbor.g = tempG;
              newPath = true;
            }
          } else {
            neighbor.g = tempG;
            newPath = true;
            this.openList.add(neighbor);
          }

          // Yes, it's a better path
          if (newPath) {
            this.path.clear();
            neighbor.heuristic = heuristic(neighbor, end);
            neighbor.f = neighbor.g + neighbor.heuristic;
            neighbor.previous = current;
          }
        }
      }
      this.path.clear();
      var temp = current;
      this.path.add(temp);
      while (temp.previous != null) {
        rounds++;
        if (rounds > maxRounds) return path;
        this.path.add(temp.previous);
        temp = temp.previous;
      }
    }
    return path;
  }
}
function heuristic(a, b) {
  return dist(a.i, a.j, b.i, b.j);
}
