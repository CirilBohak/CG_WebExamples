

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
		$(".scalarNumber",container).html(incNumber+" *");

		$(".rows",container).val(n);
		$(".cols",container).val(m);
		createMatrix("#matrix03",n,m);
		updateMatrix("#matrix03",n,m,increaseMatrix(matrix01Array, incNumber));

		var tmpMatrix = [];
		for(var i=0;i<matrix01Array.length;i++){
			tmpMatrix.push(incNumber+"*"+matrix01Array[i]);
		}
		createMatrixStatic("#matrix02",n,m,tmpMatrix);
		//updateMatrix("#matrix02",n,m,tmpMatrix);

	}

	function initInputChanges(){
		container.on('change keyup','input',function(e){
			if(!checkInputs())
				return;
			var matrix1 = getMatrixFromTable($("#matrix01",container));
			var inc = $(".scalarInput",container).val();
			$(".scalarNumber",container).html(inc+" *");
			updateMatrix("#matrix03",n,m,increaseMatrix(matrix1, inc));
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

	function sizeInputChanges(){
		container.on('change','.rows, .cols',function(){
			n = $(".rows",container).val();
			m = $(".cols",container).val();
			var matrix01 = new Matrix(n,m);
			var matrix01Array = matrix01.get1D_array();
			$("#matrix01").html("");
			createMatrix("#matrix01",n,m);
			updateMatrix("#matrix01",n,m,matrix01Array);

			var incNumber = $(".scalarInput",container).val();
			$("#matrix03").html("");
			createMatrix("#matrix03",n,m);
			updateMatrix("#matrix03",n,m,increaseMatrix(matrix01Array, incNumber));

		});

	}

	function changeStyle(){
		$(".menu a").click(function(){
			if($(this).parent().hasClass("first")){
				$(".MathJaxStuff").hide();
				$(".multiplicationWIthScalar").show();
				$(this).parent().addClass("selected");
				$(".menu .second").removeClass("selected");
			}
			else{
				$(".MathJaxStuff").show();
				$(".multiplicationWIthScalar").hide();
				$(".menu .first").removeClass("selected");
				$(this).parent().addClass("selected");
			}
		});
	}
	exampleInit();
	initInputChanges();
	sizeInputChanges();
	changeStyle();
});
