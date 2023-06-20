class Node {
  // f, g, and h values for A*
  Node(i_, j_, t) {
    this.neighbors = [];
    this.f = 0;
    this.g = 0;
    this.heuristic = 0;
    this.previous = null;

    this.i = i_;
    this.j = j_;
    this.type = t;
  }
  addNeighbors(g) {
    if (i < gridSize - 1) {
      neighbors.add(g[i + 1][j]);
    }
    if (i > 0) {
      neighbors.add(g[i - 1][j]);
    }
    if (j < gridSize - 1) {
      neighbors.add(g[i][j + 1]);
    }
    if (j > 0) {
      neighbors.add(g[i][j - 1]);
    }
  }
}
