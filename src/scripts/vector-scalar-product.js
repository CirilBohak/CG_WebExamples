enabledAddingPoints = false;
var drawGuide = false;
var guideLine;

function exampleInit() {
    addVectorToList(new Vector3(3, 5, 0, 0, 0, 0));
    addVectorToList(new Vector3(5, 3, 0, 0, 0, 0));
}

// adding new vector to the list
function addVectorToList(vec) {
    vectors.push(vec);
	
    createVectorSelection(vec, vectors.length-1);
	updateVectorDropDownLists(vectors.length - 1);

	var target = document.getElementById( "vec"+(vectors.length-1) );
	target.parentNode.scrollTop = target.offsetTop;
}

function scalarMultiplication() {
	var scalar = $("#scalarValue").val();
	vector = vectors[$("#firstvector").val()].multiplyScalar(scalar);
	guideLine = vector.clone();

	removedVectorUpdate($("#firstvector").val());
	drawGuide = true;

	setTimeout(function(){
		drawGuide = false;
		guideLine.setColor(0, 0, 0);
		addVectorToList(vector);
	}, 2000);
}

function drawGuides() {console.log(drawGuide);
	if(drawGuide && guideLine) {
		proc.strokeWeight(1);
		guideLine.setColor(0, 200, 0);
		guideLine.drawArrow(5, true);
	}
}