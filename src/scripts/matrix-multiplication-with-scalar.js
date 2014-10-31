

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
		updateMatrix("#matrix02",n,m,increaseMatrix(matrix01Array, incNumber));
	}

	function initInputChanges(){
		container.on('change keyup','input',function(e){
			if(!checkInputs())
				return;
			var matrix1 = getMatrixFromTable($("#matrix01",container));
			var inc = $(".scalarInput",container).val();
			updateMatrix("#matrix02",n,m,increaseMatrix(matrix1, inc));
		});
	}

	function increaseMatrix(matrix, val){
		var matrix02 = [];
		for(var i=0;i<matrix.length;i++){
			matrix02.push(matrix[i]*val);
		}
		return matrix02;
	}

	function getMatrixFromTable(ele){
		var matrix = [];
		$("input",ele).each(function(){
			matrix.push($(this).val());
		});
		return matrix;
	}

	function checkInputs(){
		var returnStatus = true;
		$('input',container).each(function(){
			if(isNaN($(this).val()) || $(this).val()===""){
				$(this).addClass("error");
				returnStatus = false;
			}
			else{
				$(this).removeClass("error");
			}
		});
		return returnStatus;
	}

	exampleInit();
	initInputChanges();
});
