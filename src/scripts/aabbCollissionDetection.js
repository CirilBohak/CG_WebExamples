

var movingBalls = Array();
var stop = false;

// conversion from grid to canvas coordinate sytem
function gridToCanvasTransformMovingBall(movingBall) {
    
    var x = proc.width / 2 + movingBall.x * unit;
    var y = proc.height / 2 - movingBall.y * unit;

    var mb = new MovingBall(x, y, 0, movingBall.l, movingBall.dx, movingBall.dy, 0);
    return mb;
}

function moveMovingBalls() {

    for (var i = 0; i < movingBalls.length; i++) {

        if ( (movingBalls[i].x  - movingBalls[i].l/2) <= -18 || (movingBalls[i].x + movingBalls[i].l/2 )  >= 18 ) {
            movingBalls[i].dx = - movingBalls[i].dx;
        }
        
        if ( (movingBalls[i].y - movingBalls[i].l/2)  <= -13 || (movingBalls[i].y + movingBalls[i].l/2) >= 13) {
            movingBalls[i].dy = - movingBalls[i].dy;
        }
    
        if (stop == false) {
            movingBalls[i].x += movingBalls[i].dx;
            movingBalls[i].y += movingBalls[i].dy;
        }

        collisionDetection();
    }

    setTimeout(moveMovingBalls, 100);
}

function aaBbAreColliding(movingBall1, movingBall2) {
    var aBox = movingBall1.getBoundingBox();
    var bBox = movingBall2.getBoundingBox();

    var a = aBox[0]; var A = aBox[1];
    var b = bBox[0]; var B = bBox[1];

    return !(
        A.x < b.x
        || B.x < a.x
        || A.y < b.y
        || B.y < a.y);
}

function bruteForceAreColiding(movingBall1, movingBall2) {
    var b1CenterX = movingBall1.x;
    var b1CenterY = movingBall1.y;
    var b1R = movingBall1.l/2;

    var b2CenterX = movingBall2.x;
    var b2CenterY = movingBall2.y;
    var b2R = movingBall2.l / 2;

    var distance = Math.sqrt((b1CenterX - b2CenterX) * (b1CenterX - b2CenterX) + (b1CenterY - b2CenterY) * (b1CenterY - b2CenterY));

    return (distance <= b1R + b2R);
}


function areColliding(movingBall1,movingBall2){
    if ( alg == 1){
        return aaBbAreColliding(movingBall1,movingBall2);
    }
    else{
        return bruteForceAreColiding(movingBall1,movingBall2);
    }
}

var alg = 1;

function collisionDetection() {
    alg = parseInt($('#alg').val()) == 1;
    for (var i = 0; i < movingBalls.length - 1; ++i) {
        for (var j = i + 1; j < movingBalls.length; ++j) {
            var movingBall1 = movingBalls[i];
            var movingBall2 = movingBalls[j];
            if (movingBall1.isCollided == false && movingBall2.isCollided == false) {
                var isColliding = areColliding(movingBall1, movingBall2);
                if (isColliding) {
                    movingBall1.setColor(255, 0, 0);
                    movingBall1.dx = 0;
                    movingBall1.dy = 0;

                    movingBall2.setColor(255, 0, 0);
                    movingBall2.dx = 0;
                    movingBall2.dy = 0;

                    movingBall1.isCollided = true;
                    movingBall2.isCollided = true;
                }
            }
        }
    }
}


function exampleInit() {

}


function generateRandomMovingBalls() {
    
    var noBals = parseInt($('#randomBallsNr').val());

    for (var i = 1; i <= noBals; ++i) {
        var x = parseInt(Math.random() * 30) - 15;
        var y = parseInt(Math.random() * 20) - 10;

        var dx = Math.random();
        var dy = Math.random();

        var l = Math.random() * 4;

        var ball = new MovingBall(x, y, 0, l, dx, dy, 0);
        createMovingBallsSelection(ball, movingBalls.length);
        movingBalls.push(ball);
    }
}

function updateMovingBallsXY() {
    for (var i = 0; i < movingBalls.length; i++) {
        var movingBall = movingBalls[i];
        $('#inputx' + i).val(movingBall.x);
        $('#inputy' + i).val(movingBall.y);
    }
}

function drawMovingBall() {
        for (var i = 0; i < movingBalls.length; i++) {
            movingBalls[i].draw();
            proc.text( "Ball" + (i+1), movingBalls[i].x, movingBalls[i].y)
        }
        updateMovingBallsXY();
    
}

function stopBalls() {
    stop = true;
    $('#movingBallsList input[type="number"]').removeAttr('readonly');
}

function resumeBalls() {
    $('#movingBallsList input[type="number"]').attr('readonly', 'readonly');
    stop = false;
}

/*********************
     MOVING BALLS
**********************/

function setX(number) {
    var xVal = parseFloat($(number).val());
    var index = parseInt($(number).attr('id').replace('inputx', ''));
    movingBalls[index].x = xVal;
}

function setY(number) {
    var yVal = parseFloat($(number).val());
    var index = parseInt($(number).attr('id').replace('inputy', ''));
    movingBalls[index].y = yVal;
}

function setDX(number) {
    var dxVal = parseFloat($(number).val());
    var index = parseInt($(number).attr('id').replace('inputdx', ''));
    movingBalls[index].dx = dxVal;
}

function setDY(number) {
    var dyVal = parseFloat($(number).val());
    var index = parseInt($(number).attr('id').replace('inputdy', ''));
    movingBalls[index].dy = dyVal;
}

function setL(number) {
    var lVal = parseInt($(number).val());
    var index = parseInt($(number).attr('id').replace('inputsize', ''));
    movingBalls[index].l = lVal;
}



function createMovingBallsSelection(movingBall, index) {
    if (index == 0) {
        $("#movingBallsList").html('');
    }

    $("#movingBallsList").append(
        "<div  onmouseover='movingBalls[" + index + "].selected = true;$(this).css(\"background\",\"#EEE\")' onmouseout='movingBalls[" + index + "].selected= false,$(this).css(\"background\",\"#fff\")' id=\"movingBall" + index + "\" class=\"vectorItem\" >" +
            "<div class=\"vectorValue\">" +
                "Ball " + (index + 1) +":" +
                "<br />" +
				"<div class=\"floatLeft space\">" +
                    "<table>" +
					      "<tr>" +
                                "<td class='leftMV'></td>"
                                + "<td>" +
                                    "<div class='floatLeft'>" +
                                        "<input id='inputx" + index + "' class='vecInputCol' type='number' value='" + movingBall.x + "' min='-20' max='20' step='1' readonly='readonly' onchange='setX(this);'><br/>" +
                                        "<input id='inputy" + index + "' class='vecInputCol' type='number' value='" + movingBall.y + "' min='-20' max='20' step='1' readonly='readonly' onchange='setY(this);'><br/>" +
                                   " </div>" +
                                "</td>" +
                                "<td>" +
                                    "<div class='floatLeft'>" +
                                        "<input id='inputdx" + index + "' class='vecInputCol' type='number' value='" + movingBall.dx + "' min='-20' max='20' step='1' readonly='readonly' onchange='setDX(this);'><br>" +
                                        "<input id='inputdy" + index + "' class='vecInputCol' type='number' value='" + movingBall.dy + "' min='-20' max='20' step='1' readonly='readonly' onchange='setDY(this);'><br>" +
                                    "</div>" +
                                "</td>" +
                                "<td>" +
                                     "<input id='inputsize" + index + "'  class='vecInputCol' type='number' value='" + movingBall.l + "' min='-20' max='20' step='1' readonly='readonly' onchange='setL(this);'><br>" +
                                "</td>" +
                                "<td class='rightMV'></td>" +
                                 "<td> <button  id=\"remove\" type=\"button\" onClick=\"removeMovingBallUpdate(" + index + ")\">Remove</button> </td>" +
                            "</tr>" +
                    "<table>" +
				"</div>" +
				"<div class=\"paddingLeftPoint\">" +
					
                "</div>" +
            "</div>" +
        "</div>");
    
}

function removeMovingBallUpdate(index) {

    $("#movingBallsList").html("");
    if (movingBalls.length > 1) {
        movingBalls.splice(index, 1);
   
        for (var i = 0; i < movingBalls.length; i++) {
            createMovingBallsSelection(movingBalls[i], i);
        }
    }
    else {
        $("#movingBallsList").html("No moving balls");
        movingBalls = Array();
    }
}


function addMovingBallToList() {
    var x = parseFloat($('#inputx').val());
    var y = parseFloat($('#inputy').val());
    var dx = parseFloat($('#inputdx').val());
    var dy = parseFloat($('#inputdy').val());
    var l = parseFloat($('#inputsize').val());

    var ball = new MovingBall(x, y, 0, l, dx, dy, 0);
    createMovingBallsSelection(ball, movingBalls.length);
    movingBalls.push(ball);
}


function clearAllMovingBalls() {
    movingBalls = Array();
    $("#movingBallsList").html('');
}

