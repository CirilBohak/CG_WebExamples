// Start of processing init functions
function initProcessing(processing) {
	processing.size($("#surface").width(),  $("#surface").height());//WEBGL - 2
	//processing.use3DContext = true;
	
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
	
	proc.translate(25, 25, 0);
	proc.rect(-25, -25, 25, 25);
}

function mouseMoved() {}
function mouseClicked() {}
function mousePressed() {}
function mouseDragged() {}
function mouseReleased() {}
function mouseOut() {}

var canvas = null;
var proc = null;

window.onload = function() {
	canvas = document.getElementById("surface");
	// attaching the sketchProc function to the canvas
	proc = new Processing(canvas, initProcessing);

    exampleInit();
}

// End of processing init functions

function exampleInit() {
	
}

// adding new vector to the list
function addVectorToList(vec) {
    vectors.push(vec);
	
    createVectorSelection(vec, vectors.length-1);
	
	updateVectorDropDownLists(vectors.length - 1);	
}

/****************
   CALCULATION
*****************/
