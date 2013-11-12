function exampleInit() {
    addVectorToList(new Vector3(2, 5, 0, 1, 2, 0));
    addVectorToList(new Vector3(6, 3, 0,-2, 2, 0));
}

// adding new vector to the list
function addVectorToList(vec) {
    vectors.push(vec);
	
    createVectorSelection(vec, vectors.length-1);
	
	updateVectorDropDownLists(vectors.length - 1);	
}

/****************
   CALCULATION
*****************/
function calculateAngle() {
	var vectorA = new Vector3(	parseInt($($("#vec"+$("#firstvector").val()+" input")[0]).val()),
								parseInt($($("#vec"+$("#firstvector").val()+" input")[1]).val()),
								0);
	
	var vectorB = new Vector3(	parseInt($($("#vec"+$("#secondvector").val()+" input")[0]).val()),
								parseInt($($("#vec"+$("#secondvector").val()+" input")[1]).val()),
								0);
	
	var dotProduct = new Vector3().dotVectors(vectorA,vectorB);
	var vectorA_Length = vectorA.length();
	var vectorB_Length = vectorB.length();
	var angle = Math.acos(precise_round(dotProduct/(vectorA_Length * vectorB_Length),3));
	
	//show result
	$("#result").css({visibility : 'visible', display : 'block'});
	var AllJax = MathJax.Hub.getAllJax("result");//MathOutput
	MathJax.Hub.queue.Push([	"Text",
								AllJax[0],
								"\\vec{a}*\\vec{b}=\\left[\\begin{array}{c}"+vectorA.x+"\\\\"+vectorA.y+"\\end{array}\\right]*\\left[\\begin{array}{c}"+vectorB.x+"\\\\"+vectorB.y+"\\end{array}\\right]=\\\\"+
								"("+vectorA.x+")*("+vectorA.y+") + ("+vectorB.x+")*("+vectorB.y+") = "+dotProduct + "\\\\"
								]);
	
	MathJax.Hub.queue.Push([	"Text",
								AllJax[1],
								"\\left\\|\\vec{a}\\right\\| * \\left\\|\\vec{b}\\right\\| = \\\\"+
								"\\sqrt{"+vectorA.x+"^2+"+vectorA.y+"^2} * \\sqrt{"+vectorB.x+"^2+"+vectorB.y+"^2} = " + precise_round(vectorA_Length*vectorB_Length,2) + "\\\\"
							]);
	
	MathJax.Hub.queue.Push([	"Text",
								AllJax[2],
								"\\arccos\\left(\\frac{\\vec{a}*\\vec{b}}{\\|\\vec{a}\\| * \\|\\vec{b}\\|}\\right) = "+precise_round((angle*57.2957795),2)+"^\\circ\\\\"
							]);
}