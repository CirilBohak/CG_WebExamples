enabledAddingPoints = false;

var matrix01;
var n = Math.floor(Math.random() * 5) + 2, 
	m = Math.floor(Math.random() * 5) + 2;

function exampleInit() {
	// Matrix constructor takes dimensions parameters in another
	// order compared to the helper functions in visual.js (m, n) / (n, m)
	matrix01 = new Matrix(m, n);
    createMatrix("#matrix01", n, m);
	updateMatrix("#matrix01", n, m, matrix01.get1D_array());
}


function bindEvents() {
	// on matrix field change
	$(".vecInputCol").bind("keyup mouseup", function() {
		updateMatrixVariable(Number($(this).parent().attr("class")[1]),
							 Number($(this).parent().attr("class")[2]),
							 Number($(this).val()));
	});
}

$( document ).ready(function() {
	exampleInit();
	bindEvents();
});