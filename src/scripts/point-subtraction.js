var points = Array();
var vectors = Array();

var size = 5;

function exampleInit() {
    addPointToList(new Point(3, 2, 0));
}

// drawing all the stored points
function drawPoints() {
	for (var i = 0; i < points.length; i++) {
		drawPoint(gridToCanvasTransform(points[i].point), size, points[i].color);
	}
}

function addPointToList(point) {
    points.push({point: point, color: new Color(0,0,0)});
	
    createPointSelection(point, points.length-1);

	updatePointDropDownLists(points.length - 1);
	
	var target = document.getElementById("point" + (points.length - 1));

	if (target) {
	    target.parentNode.scrollTop = target.offsetTop;
	}
}

// drawing all the stored vectors
function drawVectors() {
    for (var i = 0; i < vectors.length; i++) {
        drawArrow(gridToCanvasTransform(vectors[i].point), vectors[i].vector, unit, vectors[i].color);
    }
}

function addVectorToList(point, vec) {
	vectors.push({point: point, vector: vec, color: new Color(0,0,0)});
	
	createVectorSelection(point, vec, vectors.length-1);
	
	var target = document.getElementById( "vec"+(vectors.length-1) );
	target.parentNode.scrollTop = target.offsetTop;
}

/****************
   CALCULATION
*****************/
function subtractPoints() {
	if(points.length === 1) { 
		$("#vectorList").prepend("<br /><p style=\"font-family:Verdana;font-size:11px;font-style:normal\"><b>Note:</b> values do not represent vector components but its location!</p><br />");	
	}else{
		var pointA = new Point(	$($("#point"+$("#firstpoint").val()+" input")[0]).val(),
								$($("#point"+$("#firstpoint").val()+" input")[1]).val(),
								0);
		
		var pointB = new Point(	$($("#point"+$("#secondpoint").val()+" input")[0]).val(),
								$($("#point"+$("#secondpoint").val()+" input")[1]).val(),
								0);
		
		var result = new Vector3((pointB.x-pointA.x), (pointB.y-pointA.y), (pointB.z-pointA.z));
		
		addVectorToList(pointA, result);
	}
}
