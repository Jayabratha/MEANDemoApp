//Background Animation Object
var bgAnimate = (function() {
	var instance;

	function init() {
		var background, screenWidth, screenHeight, numberOfRows, numberofCols, renderBackground, startAnimation,
			stopAnimation, clearBackground, animation, draw, drawRow, opacityScale = [0.2, 0.4, 0.6, 0.8, 1, 0.8, 0.6, 0.4, 0.2],
			opacityScaleLength = opacityScale.length, l = 0; count = 0, animateArray = [];

		/* Render the Node Logo Background */
		renderBackground = function(opacity) {
			/* Get Background Reference */
			screenWidth = window.innerWidth;
			screenHeight = window.innerHeight;

			numberOfRows = Math.ceil(screenHeight / 40) + 20;
			numberofCols = Math.floor(screenWidth / 40) + 20;

			var img = new Image();
			img.src = '../images/nodejs.png';

			var canvas = document.getElementById('background-canvas');
			if (canvas.getContext) {
				var ctx = canvas.getContext('2d');
			};

			drawRow = function(colIndex, rowIndex, opacityIndex) {
				count++;
				console.log(count);
				console.log(colIndex, opacityIndex, opacityScale[opacityIndex], rowIndex);
				ctx.globalAlpha = opacityScale[opacityIndex];
				if (rowIndex % 2 == 0) {
					ctx.drawImage(img, (40 * colIndex) - 20, (30 * rowIndex));
				} else {
					ctx.drawImage(img, (40 * colIndex), (30 * rowIndex));
				}
				setTimeout(function() {
					opacityIndex += 1;
					if (opacityIndex < opacityScaleLength) {
						animateArray.push(colIndex);
						drawRow(colIndex, rowIndex, opacityIndex);
					} else {
						animateArray.splice(colIndex, 1);
					}
				}, 50);
				
			}

			draw = function() {
				var i, k, l = 0; indexArray = [];
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				//numberOfRows = 41;
				console.log(numberOfRows);
				for (i = 0; i < numberOfRows; i++) {
					/* Generate Icon Indexes to animate */
					for (k = 0; k < 40; k += 3) {
						indexArray.push(Math.floor((3 * Math.random()) + k));
					}
					for (j = 0; j < numberofCols; j++) {
						if (indexArray.indexOf(j) > 0) {
							drawRow(j, i, l);
						} else {
							ctx.globalAlpha = 1;
							if (i % 2 == 0) {
								ctx.drawImage(img, (40 * j) - 20, (30 * i));
							} else {
								ctx.drawImage(img, (40 * j), (30 * i));
							}
						}
					}
					indexArray.length = 0;
				};
			};

			img.addEventListener("load", function() {
				draw();
				console.log(count);
			}, false);

		};

		/* Animate Background */
		startAnimation = function() {
			animation = setInterval(draw, 500);
		}

		/* Stop Background Animation */
		stopAnimation = function() {
			if (animation) {
				clearInterval(animation);
			}
		}

		/* Clear the Node logo Background */
		clearBackground = function() {
			$('#node-background').empty();
		}

		return {
			renderBackground: renderBackground,
			startAnimation: startAnimation,
			stopAnimation: stopAnimation,
			clearBackground: clearBackground
		}
	};

	return {
		getInstance: function() {
			if (!instance) {
				instance = init();
			}
			return instance;
		}
	}
})();