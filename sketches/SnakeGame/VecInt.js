//My own little Vector Class
class VecInt {
  VecInt(v) {
    this.x = v.x;
    this.y = v.y;
  }
  VecInt(x, y) {
    this.x = x;
    this.y = y;
  }
  copy() {
    return new VecInt(x, y);
  }
  add(v) {
    x += v.x;
    y += v.y;
  }
  set(v) {
    x = v.x;
    y = v.y;
  }
  set(x, y) {
    this.x = x;
    this.y = y;
  }
}
