// Start of processing init functions
function initProcessing(processing) {
	processing.width = $("#surface").width();
	processing.height = $("#surface").height();
	processing.setup = setup;
	processing.draw = draw;
	processing.mouseMoved = mouseMoved;
	processing.mouseClicked = mouseClicked;
	processing.mousePressed = mousePressed;
	processing.mouseDragged = mouseDragged;
	processing.mouseReleased = mouseReleased;
	processing.mouseOut = mouseOut;
}

function setup() {}

function draw() {
    // clear background
    proc.background(255);

    // draw grid
    drawGrid();

    // draw points
    drawPoints();

    // draw vectors
    drawVectors();
}

function mouseMoved() {}

var enabledAddingPoints = false;
function mouseClicked() {
    if (enabledAddingPoints) {
        addPoint(proc.mouseX, proc.mouseY);
    }
}
function mousePressed() {}
function mouseDragged() {}
function mouseReleased() {}
function mouseOut() {}

var canvas = null;
var proc = null;

// End of processing init functions

// auxiliary class
var Point = function(x, y) {
    this.x = x;
    this.y = y;

    this.draw = function() {
        var pt = gridToCanvasTransform(this);
        proc.ellipse(pt.x, pt.y, 5, 5);
    };
};

// lists of points and vectors
var points = Array();
var vectors = Array();

window.onload = function() {
	canvas = document.getElementById("surface");
	// attaching the sketchProc function to the canvas
	proc = new Processing(canvas, initProcessing);

    addVectorToList(new Vector(2, 5, 1, 2));
    addVectorToList(new Vector(6, 3, -2, 2));
}

// adding new point to the list 
function addPoint(x, y) {
    points.push(canvasToGridTransform(new Point(x, y)));
}

// adding new vector to the list
function addVectorToList(vec) {
    vectors.push(vec);
    $("#vectorList").append(
        "<div id=\"vec"+ (vectors.length - 1) +"\"> "+
        "Vector " + (vectors.length - 1) + ":"+
        "<br />"+
        "x: <input class=\"vecInput\" type=\"number\" value=\""+vec.x+"\" min=\"-20\" max=\"20\" step=\"1\" />"+
        "y: <input class=\"vecInput\" type=\"number\" value=\""+vec.y+"\" min=\"-20\" max=\"20\" step=\"1\" />"+
        "lx: <input class=\"vecInput\" type=\"number\" value=\""+vec.locX+"\" min=\"-20\" max=\"20\" step=\"1\" />"+
        "ly: <input class=\"vecInput\" type=\"number\" value=\""+vec.locY+"\" min=\"-20\" max=\"20\" step=\"1\" />"+
        "<button type=\"button\" onClick=\"vectors["+(vectors.length-1)+"].negate()\">Negate</button>"+
        "<br /><br />");
    $("#vec"+ (vectors.length - 1) +" input").on('change', function () { updateVectors(false); });
}

// updating vector values
function updateVectors(values) {
    if (!values) {
        for (var i = 0; i < vectors.length; i++) {
            var vals = $("#vec"+i+" input");
            var vec = vectors[i];
            vec.x = $(vals[0]).val();
            vec.y = $(vals[1]).val();
            vec.locX = $(vals[2]).val();
            vec.locY = $(vals[3]).val();
        }
    } else {
        for (var i = 0; i < vectors.length; i++) {
            var vals = $("#vec"+i+" input");
            var vec = vectors[i];
            $(vals[0]).val(vec.x);
            $(vals[1]).val(vec.y);
            $(vals[2]).val(vec.locX);
            $(vals[3]).val(vec.locY);
        }
    }
}

// drawing all the stored points
function drawPoints() {
    for (var i = 0; i < points.length; i++) {
        points[i].draw();
    }
}

// drawing all the stored vectors
function drawVectors() {
    for (var i = 0; i < vectors.length; i++) {
        vectors[i].draw();
    }
}

// conversion from canvas to grid coordinate system
function canvasToGridTransform(point) {
    if (! (point instanceof Point) )
        return point;

    var x = (point.x - proc.width / 2) / unit;
    var y = (proc.height / 2 - point.y) / unit;

    var p = new Point(x, y);

    return p;
}

// conversion from grid to canvas coordinate system
function gridToCanvasTransform(point) {
    if (! (point instanceof Point) )
        return point;

    var x = proc.width / 2 + point.x * unit;
    var y = proc.height / 2 - point.y * unit;

    var p = new Point(x, y);

    return p;
}

// function for drawing the coordinate system grid
var unit = 20;
function drawGrid() {
    proc.smooth();
    proc.strokeWeight(1);
    canvas.getContext("2d").font="10px Arial";

    // vertical lines
    for (var i = 40; i <= proc.width - 40; i += unit) {
        proc.stroke(225);
        proc.line(i, 40, i, proc.height - 40);
        proc.stroke(90);
        proc.line(i, proc.height / 2 - 5, i, proc.height / 2 + 5);
        
        canvas.getContext("2d").fillText((i / 20) - 20, i - 10, proc.height / 2 + 17);
    }

    // horizontal lines
    for (var i = 40; i <= proc.height - 40; i += unit) {
        proc.stroke(225);
        proc.line(40, i, proc.width - 40, i);
        proc.stroke(90);
        proc.line(proc.width / 2 - 5, i, proc.width / 2 + 5, i);
        
        canvas.getContext("2d").fillText((-i / 20) + 15, proc.width / 2 - 20 , i + 5);
    }

    // main lines
    proc.stroke(0);
    proc.strokeWeight(2);
    // vertical
    proc.line(proc.width / 2, 20, proc.width / 2, proc.height - 20);
    proc.line(proc.width / 2, 20, proc.width / 2 + 5, 35);
    proc.line(proc.width / 2, 20, proc.width / 2 - 5, 35);
    proc.line(proc.width / 2 + 5, proc.height - 35, proc.width / 2, proc.height - 20);
    proc.line(proc.width / 2 - 5, proc.height - 35, proc.width / 2, proc.height - 20);

    // horizontal
    proc.line(20, proc.height / 2, proc.width - 20, proc.height / 2);
    proc.line(20, proc.height / 2, 35, proc.height / 2 + 5);
    proc.line(20, proc.height / 2, 35, proc.height / 2 - 5);
    proc.line(proc.width - 35, proc.height / 2 + 5, proc.width - 20, proc.height / 2);
    proc.line(proc.width - 35, proc.height / 2 - 5, proc.width - 20, proc.height / 2);

}