function writeToCanvas()
{
	var font = $("#fonts").val();
	var text = $("#text").val();;
	var canvas = document.getElementById('surface');
	var ctx = canvas.getContext('2d');
	
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = 'http://fonts.googleapis.com/css?family=Vast+Shadow';
	document.getElementsByTagName('head')[0].appendChild(link);
	
	ctx.clearRect ( 0 , 0 , 800 , 600 );	
	
	// Trick from http://stackoverflow.com/questions/2635814/
	var image = new Image;
	image.src = link.href;
	image.onerror = function() {
		ctx.font = '50px "'+font+'"';
		ctx.textBaseline = 'top';
		ctx.fillText(text, 20, 10);
	};
}
