enabledAddingPoints = false;

var matrix01;
var n = Math.floor(Math.random() * 5) + 2, m = Math.floor(Math.random() * 5) + 2;

function exampleInit() {
	matrix01 = new Matrix(n,m);
    createMatrix("#matrix01",n,m);
	updateMatrix("#matrix01",n,m,matrix01.get1D_array());
}