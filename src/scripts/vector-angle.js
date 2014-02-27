var vectors = Array();

var guideColor;
var guidePoint,  guideLinePoint1, guideLinePoint2;
var guideVector, guideLine1, guideLine2;

var dashes;

var drawGuide = false;
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
var pointA, vectorA,
	pointB, vectorB;

function calculateAngle() {
	if(!drawGuide){
		pointA = new Point(		parseInt($($("#vec"+$("#firstvector").val()+" input")[2]).val()),
								parseInt($($("#vec"+$("#firstvector").val()+" input")[3]).val()),
								0);
		vectorA = new Vector3(	parseInt($($("#vec"+$("#firstvector").val()+" input")[0]).val()),
								parseInt($($("#vec"+$("#firstvector").val()+" input")[1]).val()),
								0);

		pointB = new Point(		parseInt($($("#vec"+$("#secondvector").val()+" input")[2]).val()),
								parseInt($($("#vec"+$("#secondvector").val()+" input")[3]).val()),
								0);
		vectorB = new Vector3(	parseInt($($("#vec"+$("#secondvector").val()+" input")[0]).val()),
								parseInt($($("#vec"+$("#secondvector").val()+" input")[1]).val()),
								0);
		
		var dotProduct = new Vector3().dotVectors(vectorA,vectorB),
			vectorA_Length = vectorA.length(), 
			vectorB_Length = vectorB.length();
		var angle = vectorA.angleTo(vectorB);
		
		/****************************
		   Settings for guide lines
		*****************************/
		guideColor = new Color(0,200,0);
		
		guidePoint = pointA; guideVector = vectorB;
		guideLinePoint1 = pointB; guideLine1 = new Vector3(pointA.x-pointB.x, pointA.y-pointB.y, 0);
		guideLinePoint2 = new Point(vectorB.x+pointB.x, vectorB.y+pointB.y, 0); guideLine2 = guideLine1;
		
		dashes = Math.round(guideLine1.length())*2;
		drawGuide = true;
		
		currID = $("#secondvector").val();
		vectors[currID].color.setColor(180,180,180);
		setTimeout(function(){
			drawGuide = false;
			vectors[currID].color.setColor(0,0,0);
		}, 5500);
		
		/****************
		  MathJax result
		*****************/
		$("#result").css({visibility : 'visible', display : 'block'});
		var AllJax = MathJax.Hub.getAllJax("result");//MathOutput
		MathJax.Hub.queue.Push([	"Text",
									AllJax[0],
									"\\vec{a}*\\vec{b}=\\left[\\begin{array}{c}"+vectorA.x+"\\\\"+vectorA.y+"\\end{array}\\right]*\\left[\\begin{array}{c}"+vectorB.x+"\\\\"+vectorB.y+"\\end{array}\\right]=\\\\"+
									"("+vectorA.x+")*("+vectorB.x+") + ("+vectorA.y+")*("+vectorB.y+") = "+dotProduct + "\\\\"
									]);
		
		MathJax.Hub.queue.Push([	"Text",
									AllJax[1],
									"\\left\\|\\vec{a}\\right\\| * \\left\\|\\vec{b}\\right\\| = \\\\"+
									"\\sqrt{("+vectorA.x+")^2+("+vectorA.y+")^2} * \\sqrt{("+vectorB.x+")^2+("+vectorB.y+")^2} = " + precise_round(vectorA_Length*vectorB_Length,2) + "\\\\"
								]);
		
		MathJax.Hub.queue.Push([	"Text",
									AllJax[2],
									"\\arccos\\left(\\frac{\\vec{a}*\\vec{b}}{\\|\\vec{a}\\| * \\|\\vec{b}\\|}\\right) = "+precise_round(rad_to_degree(angle),2)+"^\\circ\\\\"
								]);
	}
}

/**********************
   GUIDE LINES (DRAW)
***********************/

function drawGuides(){
	if(drawGuide){
		proc.strokeWeight(3);
		
		var guideLoc = gridToCanvasTransform(guidePoint);
		drawArrow(guideLoc, guideVector, unit, guideColor);
		
		//First guide line
		drawLine(gridToCanvasTransform(guideLinePoint1), guideLine1, unit, guideColor, dashes, 1);
		
		//Second guide line
		drawLine(gridToCanvasTransform(guideLinePoint2), guideLine2, unit, guideColor, dashes, 1);
		
		//Angle
		drawAngleArc(gridToCanvasTransform(pointA), vectorA, gridToCanvasTransform(pointB), vectorB, unit, 60, guideColor);
	}
}