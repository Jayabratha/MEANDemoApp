//Background Animation Object
var bgAnimate = (function() {
	var instance;

	function init() {
		var background, screenWidth, screenHeight, numberOfRows, numberofCols, renderBackground, startAnimation,
			stopAnimation, clearBackground, animation, draw, drawRow, opacityScale = [0.2, 0.4, 0.6, 0.8, 1, 0.8, 0.6, 0.4, 0.2],
			opacityScaleLength = opacityScale.length, l = 0; count = 0;

		/* Render the Node Logo Background */
		renderBackground = function(opacity) {
			/* Get Background Reference */
			// background = $('#node-background');
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

			drawRow = function(indexArray, opacityIndex, rowIndex) {
				count++;
				console.log(count);
				console.log(indexArray, opacityScale[opacityIndex], rowIndex)
				for (j = 0; j < numberofCols; j++) {
					if (indexArray.indexOf(j) > 0) {
						ctx.globalAlpha = opacityScale[opacityIndex];
					}
					if (rowIndex % 2 == 0) {
						ctx.drawImage(img, (40 * j) - 20, (30 * rowIndex));
					} else {
						ctx.drawImage(img, (40 * j), (30 * rowIndex));
					}
					ctx.globalAlpha = 1;
					setTimeout(function() {
						l += 1;
						if(l < opacityScaleLength) {
							drawRow(indexArray, l, rowIndex);
						}
					}, 1000);
				}
			}

			draw = function() {
				var i, k, l = 0; indexArray = [];
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				//numberOfRows = 1;
				console.log(numberOfRows);
				for (i = 0; i < numberOfRows; i++) {
					/* Generate Icon Indexes to animate */
					for (k = 0; k < 40; k += 3) {
						indexArray.push(Math.floor((3 * Math.random()) + k));
					}
					drawRow(indexArray, l, i);
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
			animation = setInterval(draw, 2000);
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