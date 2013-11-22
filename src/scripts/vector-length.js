function exampleInit() {
    addVectorToList(new Vector3(2, 5, 0, 1, 2, 0));
    addVectorToList(new Vector3(6, 3, 0, -2, 2, 0));
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
function calculateLength() {
	var vector = new Vector3(	parseInt($($("#vec"+$("#firstvector").val()+" input")[0]).val()),
								parseInt($($("#vec"+$("#firstvector").val()+" input")[1]).val()),
								0);
	
	var length = precise_round(vector.length(),2);
	
	//show result
	$("#result").css({visibility : 'visible', display : 'block'});
	MathJax.Hub.queue.Push([	"Text",
								MathJax.Hub.getAllJax("MathOutput")[0],
								length
							]);
}
