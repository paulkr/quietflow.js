// quietflow.js
// © 2015 Paul Krishnamurthy

$.fn.quietflow = function(attributes){

	// Containing element
	var $element = this;
	var $limitX = $element.width();
	var $limitY = $element.height();

	// Remove quietflow	
	$("#quietflow").remove();

	// Defaults
	var theme = "starfield";
	var z_Index = -1000;
	if (attributes != undefined){
		if (attributes.z_Index != undefined){
			z_Index = attributes.z_Index;
		}
	}

	var backgroundCol,
		speed,
		lineGlow,
		specificColors = [],
		transparent = true,
		squareSize = 10,
		maxRed = 255,
		maxGreen = 255,
		maxBlue = 255,
		mainRadius = 20,
		miniRadii = 30,
		circleCol = "#6F6F6F",
		maxRadius = 40,
		bounceSpeed = 50,
		bounceBallCount = 50,
		centerX = $limitX/2,
		centerY = $limitY/2,
		lines = 50,
		primary = "#D4145A",
		accent = "#FBB03B",
		starSize = 3,
		starColor = "#fff",
		triangles = 50,
		boxCount = 400,
		maxBoxSize = 80;

	// Create canvas and set attributes
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.id = "quietflow";
	canvas.width = $limitX;
	canvas.height = $limitY;
	canvas.style.zIndex = z_Index;
	canvas.style.position = "absolute";
	canvas.style.top = 0;

	// Attach canvas to element
	var $checkValidID = $(this).attr("id");

	if (!($checkValidID == undefined)){
		var appendObject = document.getElementById($checkValidID);
		appendObject.appendChild(canvas);
	} else {
		document.body.appendChild(canvas);
	}

	function styledMessage(message, background, color){
		console.log("%c " + message , "background: " + background + "; color: " + color);
	}

	if (attributes != undefined){

		if (attributes.theme == "squareFlash"){

			theme = "squareFlash";

			// Square length
			if (attributes.squareSize != undefined) squareSize = attributes.squareSize;

			// Color randomness
			if (attributes.maxRed != undefined) maxRed = attributes.maxRed;
			if (attributes.maxGreen != undefined) maxGreen = attributes.maxGreen;
			if (attributes.maxBlue != undefined) maxBlue = attributes.maxBlue;

			// Speed in milliseconds
			attributes.speed != undefined ? speed = attributes.speed : speed = 100;

		} else if (attributes.theme == "vortex"){

			theme = "vortex";

			// Circle attributes
			if (attributes.mainRadius != undefined) mainRadius = attributes.mainRadius;
			if (attributes.miniRadii != undefined) miniRadii = attributes.miniRadii;

			// Colors
			attributes.backgroundCol != undefined ? backgroundCol = attributes.backgroundCol : backgroundCol = "#01FAFC";
			if (attributes.circleCol != undefined) circleCol = attributes.circleCol;

			attributes.speed != undefined ? speed = attributes.speed : speed = 10;

		} else if (attributes.theme == "bouncingBalls"){

			theme = "bouncingBalls";

			if (attributes.specificColors != undefined) specificColors = attributes.specificColors;

			attributes.backgroundCol != undefined ? backgroundCol = attributes.backgroundCol : backgroundCol = "#D6D6D6";
			if (attributes.maxRadius != undefined) maxRadius = attributes.maxRadius;
			if (attributes.bounceSpeed != undefined) bounceSpeed = attributes.bounceSpeed;
			if (attributes.bounceBallCount != undefined) bounceBallCount = attributes.bounceBallCount;
			attributes.transparent != undefined ? transparent = attributes.transparent : transparent = true;

		} else if (attributes.theme == "shootingLines"){

			theme = "shootingLines";

			attributes.backgroundCol != undefined ? backgroundCol = attributes.backgroundCol : backgroundCol = "#000";
			attributes.lineColor != undefined ? lineColor = attributes.lineColor : lineColor = "#fff";
			attributes.speed != undefined ? speed = attributes.speed : speed = 150;
			attributes.lineGlow != undefined ? lineGlow = attributes.lineGlow : lineGlow = "#fff";

			if (attributes.lines != undefined) lines = attributes.lines;

		} else if (attributes.theme == "simpleGradient"){

			theme = "simpleGradient";

			if (attributes.primary != undefined) primary = attributes.primary;
			if (attributes.accent != undefined) accent = attributes.accent;

		} else if (attributes.theme == "starfield"){

			theme = "starfield";

			if (attributes.starColor != undefined) starColor = attributes.starColor;
			if (attributes.starSize != undefined) starSize = attributes.starSize;

			attributes.speed != undefined ? speed = attributes.speed : speed = 100;

		} else if (attributes.theme == "layeredTriangles"){

			theme = "layeredTriangles";

			attributes.backgroundCol != undefined ? backgroundCol = attributes.backgroundCol : backgroundCol = "#D6D6D6";
			attributes.transparent != undefined ? transparent = attributes.transparent : transparent = true;

			if (attributes.specificColors != undefined) specificColors = attributes.specificColors;
			if (attributes.triangles != undefined) triangles = attributes.triangles;

		} else if (attributes.theme == "cornerSpikes"){

			theme = "cornerSpikes";

			if (attributes.specificColors != undefined) specificColors = attributes.specificColors;

			attributes.backgroundCol != undefined ? backgroundCol = attributes.backgroundCol : backgroundCol = "#000";
			attributes.lineColor != undefined ? lineColor = attributes.lineColor : lineColor = "#fff";
			attributes.speed != undefined ? speed = attributes.speed : speed = 100;
			attributes.lineGlow != undefined ? lineGlow = attributes.lineGlow : lineGlow = "#fff";

		} else if (attributes.theme == "floatingBoxes"){

			theme = "floatingBoxes";

			if (attributes.specificColors != undefined) specificColors = attributes.specificColors;
			if (attributes.boxCount != undefined) boxCount = attributes.boxCount;
			if (attributes.maxBoxSize != undefined) maxBoxSize = attributes.maxBoxSize;

			attributes.backgroundCol != undefined ? backgroundCol = attributes.backgroundCol : backgroundCol = "#D6D6D6";
			attributes.transparent != undefined ? transparent = attributes.transparent : transparent = true;
		}

	} else {
		styledMessage("You need to specify some attributes!", "#D6D6D6", "#DF0000");
	}

	function randCol(r, g, b, a){
		// Handle individual alpha to avoid use of globalAlpha
		var col;
		if (a != undefined){
			col = "rgba(" + Math.floor(Math.random()*r).toString() + "," +
					Math.floor(Math.random()*g).toString() + "," +
					Math.floor(Math.random()*b).toString() + ", .5)";
		} else {
			col = "rgb(" + Math.floor(Math.random()*r).toString() + "," +
					Math.floor(Math.random()*g).toString() + "," +
					Math.floor(Math.random()*b).toString() + ")";
		}
		return col;
	}

	function init(){

		if (theme == "squareFlash"){

			setTimeout(squareFlashTimed, speed);

			function squareFlashTimed(){

				for (var i = 0; i < $limitX; i += squareSize+1){
					for (var j = 0; j < $limitY; j += squareSize+1){
						// Set color and draw square
						ctx.fillStyle = randCol(maxRed, maxGreen, maxBlue);
						ctx.fillRect(i, j, squareSize, squareSize);
					}
				}

				setTimeout(squareFlashTimed, speed);
			}

		} else if (theme == "vortex"){

			var dx = 2;
			var dy = 4;
			var x = $limitX/2;
			var y = $limitY/2;

			setTimeout(vortexTimed, speed);

			function vortexTimed(){

				// Add delta x and y to coordinates
				if (x + dx > $limitX || x + dx < 0){
					dx = -dx;
				}
				if (y + dy > $limitY || y + dy < 0){
					dy = -dy;
				}

				x += dx;
				y += dy;

				ctx.fillStyle = backgroundCol;
				ctx.fillRect(0, 0, $limitX, $limitY);

				for (var i = 0; i < miniRadii; i++){
					for (var j = 0; j < miniRadii; j++){

						// Generate point
						var newX = i/miniRadii * $limitX;
						var newY = j/miniRadii * $limitY;
						var newRadius = Math.sqrt(Math.pow(x-newX, 2) + Math.pow(y-newY, 2)) / mainRadius;						
						ctx.beginPath();

						// Draw circles
						ctx.fillStyle = circleCol;
						ctx.arc(newX,newY, newRadius, 0, Math.PI*2, true);
						ctx.closePath();
						ctx.fill();
					}
				}

				setTimeout(vortexTimed, speed);
			}

		} else if (theme == "bouncingBalls"){

			circleData = [];

			for (var i = 0; i < bounceBallCount; i++){

				// Random x, y, radius, dx, dy, (col)
				if (specificColors.length == 0){
					if (transparent){
						circleData.push([Math.random() * $limitX, Math.random() * $limitY, Math.random() * maxRadius, Math.random() * 2, Math.random() * 4, randCol(255, 255, 255, .5)]);
					} else {
						circleData.push([Math.random() * $limitX, Math.random() * $limitY, Math.random() * maxRadius, Math.random() * 2, Math.random() * 4, randCol(255, 255, 255)]);
					}
				} else {
					circleData.push([Math.random() * $limitX, Math.random() * $limitY, Math.random() * maxRadius, Math.random() * 2, Math.random() * 4, specificColors[Math.floor(Math.random() * specificColors.length)]]);
				}
			}

			setTimeout(bouncingBallsTimed, bounceSpeed);

			function bouncingBallsTimed(){

				ctx.fillStyle = backgroundCol;
				ctx.fillRect(0, 0, $limitX, $limitY);

				for (var i = 0; i < bounceBallCount; i++){

					var current = circleData[i];
					var X = 0,
						Y = 1,
						RADIUS = 2,
						DX = 3,
						DY = 4,
						COLOR = 5;

					// Set boundaries
					if (current[X] + current[DX] > $limitX || current[X] + current[DX] < 0){
						current[3] = -current[3];
					} 
					if (current[Y] + current[DY] > $limitY || current[Y] + current[DY] < 0){
						current[DY] = -current[DY];
					}

					// Add delta x and y
					current[X] += current[DX];
					current[Y] += current[DY];

					// Draw circles
					ctx.beginPath();
					ctx.fillStyle = current[COLOR];
					ctx.arc(current[X], current[Y], current[RADIUS], 0, Math.PI * 2, true);
					ctx.closePath();
					ctx.fill();

				}
					
				setTimeout(bouncingBallsTimed, bounceSpeed);
			}

		} else if (theme == "shootingLines"){

			setTimeout(shootingLinesTimed, speed);

			function shootingLinesTimed(){

				ctx.fillStyle = backgroundCol;
				ctx.fillRect(0, 0, $limitX, $limitY);

				ctx.beginPath();
				ctx.fillStyle = lineColor;
				ctx.arc(centerX, centerY, 2, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.fill();

				for (var i = 0; i < lines; i++){
					ctx.beginPath();
					ctx.moveTo(centerX, centerY);
					ctx.lineTo(Math.random() * $limitX, Math.random() * $limitY);
					ctx.strokeStyle = lineColor;
					ctx.shadowColor = lineGlow;
					ctx.shadowBlur = 20;
					ctx.stroke();
				}
				
				setTimeout(shootingLinesTimed, speed);
			}

		} else if (theme == "simpleGradient"){

			var gradient = ctx.createLinearGradient(0, 0, $limitX/2, $limitY);
			gradient.addColorStop(0, primary);
			gradient.addColorStop(1, accent);

			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, $limitX, $limitY);

		} else if (theme == "starfield"){

			var starData = [];

			for (var i = 0; i < 700; i++){
				starData.push([Math.random() * $limitX*2 - $limitX, Math.random() * $limitY, Math.random() * starSize, Math.ceil(Math.random() * 5)]);
			}

			setTimeout(starfieldTimed, speed);

			function starfieldTimed(){

				var gradient = ctx.createLinearGradient(0, 0, $limitX/2, $limitY);
				gradient.addColorStop(0, "#333333");
				gradient.addColorStop(1, "#000");

				ctx.fillStyle = gradient;
				ctx.fillRect(0, 0, $limitX, $limitY);

				for (var i = 0; i < starData.length; i++){

					var currentStar = starData[i],
						X = 0,
						Y = 1,
						RADIUS = 2,
						SPEED = 3;

					currentStar[X] += currentStar[SPEED];

					ctx.beginPath();
					ctx.fillStyle = starColor;
					ctx.arc(currentStar[X], currentStar[Y], currentStar[RADIUS], 0, Math.PI * 2, true);
					ctx.shadowColor = "#fff";
					ctx.shadowBlur = 20;
					ctx.closePath();
					ctx.fill();

					// Create new star
					if (currentStar[X] > $limitX){
						starData.splice(i, 1);
						starData.unshift([Math.random() * $limitX/4 - $limitX/4, Math.random() * $limitY, Math.random() * starSize, Math.ceil(Math.random() * 5)]);
					}

				}

				setTimeout(starfieldTimed, speed);
			}

		} else if (theme == "layeredTriangles"){

			ctx.fillStyle = backgroundCol;
			ctx.fillRect(0, 0, $limitX, $limitY);

			for (var i = 0; i < triangles; i++){

				ctx.beginPath();
				ctx.moveTo(Math.random() * $limitX, Math.random() * $limitY);
				ctx.lineTo(Math.random() * $limitX, Math.random() * $limitY);
				ctx.lineTo(Math.random() * $limitX, Math.random() * $limitY);

				if (specificColors.length > 0){
					ctx.fillStyle = specificColors[Math.floor(Math.random() * specificColors.length)];
				} else {
					ctx.fillStyle = randCol(255, 255, 255, .5);
				}

				ctx.closePath();
				ctx.fill();

			}

		} else if (theme == "cornerSpikes"){

			ctx.fillStyle = backgroundCol;
			ctx.fillRect(0, 0, $limitX, $limitY);

			setTimeout(cornerSpikesTimed, speed);

			function cornerSpikesTimed(){
						
				ctx.beginPath();

				specificColors.length > 0 ? ctx.strokeStyle = specificColors[Math.floor(Math.random() * specificColors.length)] : ctx.strokeStyle = randCol(255, 255, 255);
				ctx.moveTo(0, 0);
				ctx.lineTo(Math.random() * $limitX, Math.random() * $limitY);

				specificColors.length > 0 ? ctx.strokeStyle = specificColors[Math.floor(Math.random() * specificColors.length)] : ctx.strokeStyle = randCol(255, 255, 255);
				ctx.moveTo($limitX, 0);
				ctx.lineTo(Math.random() * $limitX, Math.random() * $limitY);

				specificColors.length > 0 ? ctx.strokeStyle = specificColors[Math.floor(Math.random() * specificColors.length)] : ctx.strokeStyle = randCol(255, 255, 255);
				ctx.moveTo(0, $limitY);
				ctx.lineTo(Math.random() * $limitX, Math.random() * $limitY);

				specificColors.length > 0 ? ctx.strokeStyle = specificColors[Math.floor(Math.random() * specificColors.length)] : ctx.strokeStyle = randCol(255, 255, 255);
				ctx.moveTo($limitX, $limitY);
				ctx.lineTo(Math.random() * $limitX, Math.random() * $limitY);

				ctx.shadowColor = lineGlow;
				ctx.shadowBlur = 20;
				ctx.stroke();

				setTimeout(cornerSpikesTimed, speed);
			}

		} else if (theme == "floatingBoxes"){

			var squareData = [];

			for (var i = 0; i < boxCount; i++){
				
				// Random x,y,side length, color
				if (specificColors.length == 0){
					if (transparent){
						squareData.push([Math.random() * $limitX*2 - $limitX, Math.random() * $limitY, Math.random() * maxBoxSize + 1, randCol(255, 255, 255, .5), Math.random() * 5]);
					} else {
						squareData.push([Math.random() * $limitX*2 - $limitX, Math.random() * $limitY, Math.random() * maxBoxSize + 1, randCol(255, 255, 255), Math.random() * 5]);
					}
				} else {
					squareData.push([Math.random() * $limitX*2 - $limitX, Math.random() * $limitY, Math.random() * maxBoxSize + 1, specificColors[Math.floor(Math.random() * specificColors.length)], Math.random() * 5]);
				}
			}

			setTimeout(floatingBoxesTimed, 100);

			function floatingBoxesTimed(){

				ctx.fillStyle = backgroundCol;
				ctx.fillRect(0, 0, $limitX, $limitY);

				for (var i = 0; i < squareData.length; i++){

					var current = squareData[i];
					var X = 0,
						Y = 1,
						SIZE = 2,
						COLOR = 3,
						SPEED = 4;

					ctx.fillStyle = current[COLOR];
					ctx.fillRect(current[X], current[Y], current[SIZE], current[SIZE]);

					current[X] += current[SPEED];
					current[Y] -= current[SPEED];

					if (current[X] > $limitX + maxBoxSize || current[Y] < -maxBoxSize){
						squareData.splice(i, 1);
						
						// Random x,y,side length, color
						if (specificColors.length == 0){
							if (transparent){
								squareData.push([Math.random() * $limitX*2 - $limitX, Math.random() * $limitY*2 + $limitY, Math.random() * maxBoxSize + 1, randCol(255, 255, 255, .5), Math.random() * 5]);
							} else {
								squareData.push([Math.random() * $limitX*2 - $limitX, Math.random() * $limitY*2 + $limitY, Math.random() * maxBoxSize + 1, randCol(255, 255, 255), Math.random() * 5]);
							}
						} else {
							squareData.push([Math.random() * $limitX*2 - $limitX, Math.random() * $limitY*2 + $limitY, Math.random() * maxBoxSize + 1, specificColors[Math.floor(Math.random() * specificColors.length)], Math.random() * 5]);
						}
					}

				}

				setTimeout(floatingBoxesTimed, 100);

			}

		}

	}

	init();
}
