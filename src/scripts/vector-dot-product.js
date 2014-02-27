var vectors = Array();

enabledAddingPoints = false;

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
function calculateDotProduct() {
	var vectorA = new Vector3(	parseInt($($("#vec"+$("#firstvector").val()+" input")[0]).val()),
								parseInt($($("#vec"+$("#firstvector").val()+" input")[1]).val()),
								0);
	var vectorB = new Vector3(	parseInt($($("#vec"+$("#secondvector").val()+" input")[0]).val()),
								parseInt($($("#vec"+$("#secondvector").val()+" input")[1]).val()),
								0);
	
	var dotProduct = new Vector3().dotVectors(vectorA,vectorB);
	
	//show result
	$("#result").css({visibility : 'visible', display : 'block'});
	MathJax.Hub.queue.Push([	"Text",
								MathJax.Hub.getAllJax("result")[0],
								"("+vectorA.x+")*("+vectorB.x+") + ("+vectorA.y+")*("+vectorB.y+") = "+dotProduct
							]);
}