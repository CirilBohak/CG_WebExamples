var vectors = Array();

var guidePoint,  guideLinePoint1, guideLinePoint2;
var guideVector, guideLine1, guideLine2,
	gudeLineAngle, guideColor;

var drawGuide = false, drawGuideLines = false;
	enabledAddingPoints = false;
var currID = 0;

function exampleInit() {
    addVectorToList(new Point( 1, 2, 0), new Vector3(2, 5, 0));
    addVectorToList(new Point(-2, 2, 0), new Vector3(6, 3, 0));
}

// drawing all the stored vectors
function drawVectors() {
    for (var i = 0; i < vectors.length; i++) {
        drawArrow(gridToCanvasTransform(vectors[i].point), vectors[i].vector, unit, vectors[i].color);
    }
}

// adding new vector to the list
function addVectorToList(point, vec) {
	vectors.push({point: point, vector: vec, color: new Color(0,0,0)});
	
	createVectorSelection(point, vec, vectors.length-1);
	
	updateVectorDropDownLists(vectors.length - 1);	
	var target = document.getElementById( "vec"+(vectors.length-1) );
	target.parentNode.scrollTop = target.offsetTop;
}

/****************
   CALCULATION
*****************/
function addAddedVectorToList() {
	if(!drawGuide){
		var pointA = new Point(		parseInt($($("#vec"+$("#firstvector").val()+" input")[2]).val()),
									parseInt($($("#vec"+$("#firstvector").val()+" input")[3]).val()),
									0);
		var vectorA = new Vector3(	parseInt($($("#vec"+$("#firstvector").val()+" input")[0]).val()),
									parseInt($($("#vec"+$("#firstvector").val()+" input")[1]).val()),
									0);
		
		var pointB = new Point(		parseInt($($("#vec"+$("#secondvector").val()+" input")[2]).val()),
									parseInt($($("#vec"+$("#secondvector").val()+" input")[3]).val()),
									0);
		var vectorB = new Vector3(	parseInt($($("#vec"+$("#secondvector").val()+" input")[0]).val()),
									parseInt($($("#vec"+$("#secondvector").val()+" input")[1]).val()),
									0);
		
		//pointA
		var result = new Vector3().addVectors(vectorA,vectorB);	//ADD OPERATION
		
		
		/****************************
		   Settings for guide lines
		*****************************/
		guideColor = new Color(0,200,0);
		
		guidePoint = new Point(vectorA.x + pointA.x, vectorA.y + pointA.y, 0); 
		guideLinePoint1 = pointB;
		guideLinePoint2 = new Point(vectorB.x + pointB.x, vectorB.y + pointB.y, 0); 
		
		guideVector = vectorB;
		guideLine1 = new Vector3(vectorA.x + pointA.x - pointB.x, vectorA.y + pointA.y - pointB.y, 0);
		guideLine2 = new Vector3(vectorA.x + pointA.x - pointB.x, vectorA.y + pointA.y - pointB.y, 0);
		
		gudeLineAngle = precise_round(guideVector.angleTo(guideLine2),2);
		
		dashes = Math.round(guideLine1.length())*2;
		drawGuide = true; drawGuideLines = true;
		
		currID = $("#secondvector").val();
		vectors[currID].color.setColor(180,180,180);
		setTimeout(function(){ 
			addVectorToList(pointA, result); 
			drawGuideLines = false;
			if(vectors.length>1) removedVectorUpdate(currID);
			
			var target = document.getElementById( "vec"+(vectors.length-1) );
			target.parentNode.scrollTop = target.offsetTop;
			
			setTimeout(function(){ drawGuide = false; }, 3500);
		}, 3500);
	}
}

/**********************
   GUIDE LINES (DRAW)
***********************/

var dashes;
var dotDia = 1;
function drawGuides(){
	if(drawGuide){
		proc.strokeWeight(3);
		drawArrow(gridToCanvasTransform(guidePoint), guideVector, unit, guideColor);
		
		if(drawGuideLines && gudeLineAngle != 0){
			
			//First guide line
			var c_loc = gridToCanvasTransform(guideLinePoint1);
			var toX = c_loc.x + guideLine1.x * unit;
			var toY = c_loc.y - guideLine1.y * unit;
			
			proc.stroke(guideColor.r, guideColor.g, guideColor.b);
			
			for(var i=0; i<=dashes; i++) {
				var x = proc.lerp(c_loc.x, toX, i/dashes);
				var y = proc.lerp(c_loc.y, toY, i/dashes);
				proc.ellipse(x,y,dotDia,dotDia);
			}
			
			//Second guide line
			c_loc = gridToCanvasTransform(guideLinePoint2);
			toX = c_loc.x + guideLine2.x * unit;
			toY = c_loc.y - guideLine2.y * unit;
			
			proc.stroke(guideColor.r, guideColor.g, guideColor.b);
			
			for(var i=0; i<=dashes; i++) {
				var x = proc.lerp(c_loc.x, toX, i/dashes);
				var y = proc.lerp(c_loc.y, toY, i/dashes);
				proc.ellipse(x,y,dotDia,dotDia);
			}
			
		}
		
		proc.strokeWeight(2);
	}
}