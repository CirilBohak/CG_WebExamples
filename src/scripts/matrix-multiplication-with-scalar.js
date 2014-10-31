

$(function(){
	var container = $(".multiplicationWIthScalar");
	var n = Math.floor(Math.random() * 5) + 2, m = Math.floor(Math.random() * 5) + 2;
	function exampleInit() {
		var matrix01 = new Matrix(n,m);
		var incNumber = Math.floor((Math.random() * 20) - 10);
		var matrix01Array = matrix01.get1D_array();
		createMatrix("#matrix01",n,m);
		updateMatrix("#matrix01",n,m,matrix01Array);
		$(".scalarInput",container).val(incNumber);
		createMatrix("#matrix02",n,m);
		var matrix02 = [];
		for(var i=0;i<matrix01Array.length;i++){
			matrix02.push(matrix01Array[i]*incNumber);
		}
		updateMatrix("#matrix02",n,m,matrix02);
	}
	exampleInit();
	//todo: change event trigger on all inputs
});
