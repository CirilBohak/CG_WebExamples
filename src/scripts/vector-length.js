var vectors = Array();

var drawGuide = false;
	enabledAddingPoints = false;

var guideColor;
var refPoint, guidePoint,  guideLinePoint1, guideLinePoint2, lablePosPoint;
var refVec, guideLine, guideLine1, guideLine2, lablePos;
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
var point, vector, length;

function calculateLength() {
	if(!drawGuide){
		point = new Point(		parseInt($($("#vec"+$("#firstvector").val()+" input")[2]).val()),
								parseInt($($("#vec"+$("#firstvector").val()+" input")[3]).val()),
								0);
		vector = new Vector3(	parseInt($($("#vec"+$("#firstvector").val()+" input")[0]).val()),
								parseInt($($("#vec"+$("#firstvector").val()+" input")[1]).val()),
								0);
		
		length = precise_round(vector.length(),2);
		
		/****************************
		   Settings for guide lines
		*****************************/
		guideColor = new Color(0,200,0);
		drawGuide = true;
		
		currID = $("#firstvector").val();
		setTimeout(function(){
			drawGuide = false;
		}, 5500);
		
		/****************
		  MathJax result
		*****************/
		$("#result").css({visibility : 'visible', display : 'block'});
		MathJax.Hub.queue.Push([	"Text",
									MathJax.Hub.getAllJax("MathOutput")[0],
									length
								]);
	}
}

function drawGuides(){
	if(drawGuide){
		drawLineLength(gridToCanvasTransform(point), vector, unit, 1, guideColor);
	}
}
