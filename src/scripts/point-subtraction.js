function exampleInit() {
    addPointToList(new Point(3, 2, 0));
}

function addPointToList(point) {
    points.push(point);
	
    createPointSelection(point, points.length-1);

	updatePointDropDownLists(points.length - 1);
	
	var target = document.getElementById("point" + (points.length - 1));

	if (target) {
	    target.parentNode.scrollTop = target.offsetTop;
	}
}

function addVectorToList(vec) {
	vectors.push(vec);
	
	createVectorSelection(vec, vectors.length-1);
	
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
		
		var result = new Vector3((	pointB.x-pointA.x), (pointB.y-pointA.y), (pointB.z-pointA.z), 
									pointA.x, pointA.y, pointA.z);	
		
		addVectorToList(result);
	}
}
