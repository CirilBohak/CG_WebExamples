enabledAddingPoints = false;

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
function addAddedVectorToList() {
	var vectorA = new Vector3(	parseInt($($("#vec"+$("#firstvector").val()+" input")[0]).val()),
								parseInt($($("#vec"+$("#firstvector").val()+" input")[1]).val()),
								0,
								parseInt($($("#vec"+$("#firstvector").val()+" input")[2]).val()),
								parseInt($($("#vec"+$("#firstvector").val()+" input")[3]).val()),
								0);

	var vectorB = new Vector3(	parseInt($($("#vec"+$("#secondvector").val()+" input")[0]).val()),
								parseInt($($("#vec"+$("#secondvector").val()+" input")[1]).val()),
								0);
	
	var result = new Vector3().addVectors(vectorA,vectorB).setLocationFromVector(vectorA);	//ADD OPERATION
	addVectorToList(result);
	
	// Temporary vector	
	vectors.push(new Vector3(	vectorB.x, vectorB.y, vectorB.z, 
								vectorA.x + vectorA.loc.x, vectorA.y + vectorA.loc.y, vectorA.z + vectorA.loc.z, 
								0, 200, 0));
	setTimeout(function(){ vectors.pop(); updateVectors(false);},1500);
}