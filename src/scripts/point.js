// auxiliary class for point
var Point = function(x, y) {
    this.x = x;
    this.y = y;

    this.draw = function() {
        var pt = gridToCanvasTransform(this);
        proc.ellipse(pt.x, pt.y, 5, 5);
    };
};