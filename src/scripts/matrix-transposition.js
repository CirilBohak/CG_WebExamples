enabledAddingPoints = false;

var matrix01, matrix02;
var n = Math.floor(Math.random() * 5) + 2, 
	m = Math.floor(Math.random() * 5) + 2;
var transposed = false;

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

	$("#transpose").click(function() {
		if (!transposed) {
			transposed = true;
			createMatrix("#matrix02", m, n);
			updateMatrix("#matrix02", m, n, matrix01.transpose().get1D_array());
		}
	});
}

$( document ).ready(function() {
	exampleInit();
	bindEvents();
});