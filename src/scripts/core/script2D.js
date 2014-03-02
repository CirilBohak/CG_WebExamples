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

function setup() { }

function draw() {
    // clear background
    proc.background(255);

    // draw grid
    drawGrid();
	
    // draw points
    drawPoints();

    // draw vectors
    drawVectors();
	
	// draw guides
    drawGuides();
}

function mouseMoved() {}

var enabledAddingPoints = true;
function mouseClicked() {
	//if (enabledAddingPoints) addPoint(proc.mouseX, proc.mouseY);
}
function mousePressed() {}
function mouseDragged() {}
function mouseReleased() {}
function mouseOut() {}

var canvas = null;
var proc = null;

// End of processing init functions

window.onload = function() {
	canvas = document.getElementById("surface");
	// attaching the sketchProc function to the canvas
	proc = new Processing(canvas, initProcessing);
	
    exampleInit();
}

function exampleInit() { };

function drawGuides() { };

// drawing all the stored points
function drawPoints() { };

// drawing all the stored vectors
function drawVectors() { };


// conversion from canvas to grid coordinate system
function canvasToGridTransform(point) {
    if (! (point instanceof Point) ) return point;

    var x = (point.x - proc.width / 2) / unit;
    var y = (proc.height / 2 - point.y) / unit;

    return new Point(x, y);
}

// conversion from grid to canvas coordinate system
function gridToCanvasTransform(point) {
    if (! (point instanceof Point) ) return point;

    var x = proc.width / 2 + point.x * unit;
    var y = proc.height / 2 - point.y * unit;

    return new Point(x, y);
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