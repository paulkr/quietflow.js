// index.js
// © 2015 Paul Krishnamurthy

$(document).ready(function(){

	function clearAll(){
		$("#squareFlash").hide();
		$("#vortex").hide();
		$("#bouncingBalls").hide();
		$("#shootingLines").hide();
		$("#simpleGradient").hide();
		$("#starfield").hide();
		$("#layeredTriangles").hide();
		$("#cornerSpikes").hide();
		$("#floatingBoxes").hide();
	}

	clearAll();

	$("#starfield").show();

	$("body").quietflow({
		theme : "starfield"
	})

	var effect = "starfield";

	$("#effects").change(function(){

		effect = $('#effects').find(":selected").text();

		if (effect == "starfield"){
			clearAll();
			$("#starfield").show();
			$("body").quietflow({
				theme : "starfield"
			})

		} else if (effect == "squareFlash"){
			clearAll();
			$("#squareFlash").show();
			$("body").quietflow({
				theme : "squareFlash",
				squareSize : 20,
				maxRed : 255,
				maxGreen : 40,
				maxBlue : 100,
				speed : 200
			})

		} else if (effect == "vortex"){
			clearAll();
			$("#vortex").show();
			$("body").quietflow({
				theme : "vortex",
				miniRadii : 40
			})

		} else if (effect == "bouncingBalls"){
			clearAll();
			$("#bouncingBalls").show();
			$("body").quietflow({
				theme : "bouncingBalls",
				specificColors : ["rgba(255, 10, 50, .5)", "rgba(10, 255, 50, .5)", "rgba(10, 50, 255, .5)", "rgba(0, 0, 0, .5)"]
			})

		} else if (effect == "shootingLines"){
			clearAll();
			$("#shootingLines").show();
			$("body").quietflow({
				theme : "shootingLines",
				backgroundCol : "#141C26",
				lineColor : "#05E0E0",
				lineGlow : "#00ff00"
			})

		} else if (effect == "simpleGradient"){
			clearAll();
			$("#simpleGradient").show();
			$("body").quietflow({
				theme : "simpleGradient",
				primary : "#B066FE",
				accent : "#63E2FF"
			})

		} else if (effect == "layeredTriangles"){
			clearAll();
			$("#layeredTriangles").show();
			$("body").quietflow({
				theme : "layeredTriangles"
			})

		} else if (effect == "cornerSpikes"){
			clearAll();
			$("#cornerSpikes").show();
			$("body").quietflow({
				theme : "cornerSpikes",
				specificColors : ["#009245", "#FCEE21"]
			})

		} else {
			clearAll();
			$("#floatingBoxes").show();
			$("body").quietflow({
				theme : "floatingBoxes",
				specificColors : ["rgba(46, 204, 113, .5)", "rgba(52, 152, 219, .5)", "rgba(231, 76, 60, .5)", "rgba(155, 89, 182, .5)", "rgba(241, 196, 15, .5)"],
				boxCount : 500,
				backgroundCol : "black"
			})
		}
	})

})

