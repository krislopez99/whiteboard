var canvas = document.getElementById("userCanvas");
var userWhiteboard = canvas.getContext("2d");
var colors = ["red", "black", "green", "blue", "purple"];
var courseID = "PHYS100/";

document.addEventListener('contextmenu', event => event.preventDefault());

canvas.addEventListener("mousemove", function (e) {
    determineCoordinates('move', e)
});
canvas.addEventListener("mousedown", function (e) {
    determineCoordinates('down', e)
});
canvas.addEventListener("mouseup", function (e) {
    determineCoordinates('up', e)
});
canvas.addEventListener("mouseout", function (e) {
    determineCoordinates('out', e)
});

var flag = false,
    previousX = 0,
    currentX = 0,
    previousY = 0,
    currentY = 0,
    dot_flag = false,
	lineStroke = 2,
	lineColor = "black",
	currentColor = 4,
	readData = true;


function init() {
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	
	$("#fileMenu").css("left", window.innerWidth - 200 + "px");
}

function draw() {
    userWhiteboard.beginPath();
    userWhiteboard.moveTo(previousX, previousY);
    userWhiteboard.lineTo(currentX, currentY);
    userWhiteboard.strokeStyle = lineColor;
    userWhiteboard.lineWidth = lineStroke;
    userWhiteboard.stroke();
    userWhiteboard.closePath();
}
	
function determineCoordinates(type, event) {
	if((event.clientX - canvas.offsetLeft) > 75 && (event.clientX - canvas.offsetLeft) < 1340) {
		if (type == 'down') {
			readData = false;
			if (event.which == 1) {
			   lineColor = colors[currentColor];
			} else if(event.which == 3) {
			   lineColor = "white";
			}
			
			previousX = currentX;
			previousY = currentY;
			currentX = event.clientX - canvas.offsetLeft;
			currentY = event.clientY - canvas.offsetTop;
		
			flag = true;
			dot_flag = true;
			if (dot_flag) {
				userWhiteboard.beginPath();
				userWhiteboard.arc(currentX,currentY,lineStroke/2,0,2*Math.PI);
				userWhiteboard.fillStyle = lineColor;
				userWhiteboard.fill();
				userWhiteboard.closePath();
				dot_flag = false;
			}
			
			writeUserData(courseID);
		}
		if (type == 'up' || type == "out") {
			flag = false;
			readData = true;
		}
		if (type == 'move') {
			readData = false;
			if (event.which == 1) {
			   lineColor = colors[currentColor];
			} else if(event.which == 3) {
			   lineColor = "white";
			}
			
			if (flag) {
				previousX = currentX;
				previousY = currentY;
				currentX = event.clientX - canvas.offsetLeft;
				currentY = event.clientY - canvas.offsetTop;
				draw();
			}
			writeUserData(courseID);
		}
	}
}

function icon(value) {
	if(value == 1 && lineStroke < 5) {
		lineStroke++;
	} else if(value == 2 && lineStroke < 5) {
		lineStroke--;
	} else if(value == 3) {
		lineColor = colors[0];
		currentColor = 0;
	} else if(value == 4) {
		lineColor = colors[1];
		currentColor = 1;
	} else if(value == 5) {
		lineColor = colors[2];
		currentColor = 2;
	} else if(value == 6) {
		lineColor = colors[3];
		currentColor = 3;
	} else if(value == 7) {
		lineColor = colors[4];
		currentColor = 4;
	} else if(value == 8) {
		canvas.height = canvas.height;
		loadIcons();
		writeUserData(courseID);
	} 
}