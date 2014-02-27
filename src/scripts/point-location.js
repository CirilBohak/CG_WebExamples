var points = Array();
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
	
    var target = document.getElementById("point" + (points.length - 1));
    if (target) {
        target.parentNode.scrollTop = target.offsetTop;
    }
}