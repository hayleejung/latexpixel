function MShape(_polyN, _radius) {
  this.polyN = _polyN;
  this.radius = _radius;
  this.polyVertexes = new Array(this.polyN);

  var outline = new PVector(0, -this.radius);
  for (var i = 0; i < this.polyN; i++) {
    this.polyVertexes[i] = new PVector(outline.x, outline.y);
    outline.rotate2D(2*PI / this.polyN);
  }
}

MShape.prototype = {
  display : function() {
    beginShape();
    for (var i = 0; i < this.polyN; i++) {
      vertex(this.polyVertexes[i].x, this.polyVertexes[i].y);
    }
    endShape(CLOSE);
  }
}
