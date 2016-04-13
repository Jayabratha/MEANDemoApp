//Background Animation Object
var bgAnimate = (function() {
	var instance;

	function init() {
		var canvas, background, screenWidth, screenHeight, numberOfRows, numberofCols, renderBackground, startAnimation,
			stopAnimation, clearBackground, animation, draw, opacityScale = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
			opacityScaleLength = opacityScale.length,
			imgStateArray = [],
			ImgStateHolder;


		canvas = document.getElementById('background-canvas');

		//If canvas is supported get the context
		if (canvas.getContext) {
			var ctx = canvas.getContext('2d');
		};

		ImgStateHolder = function(rowIndex, colIndex, opacityIndex, increment) {
			this.rowIndex = rowIndex;
			this.colIndex = colIndex;
			this.opacityIndex = opacityIndex;
			this.increment = increment;
		}

		ImgStateHolder.prototype.updateOpacityIndex = function(opacityIndex) {
			this.opacityIndex = opacityIndex;
		}

		ImgStateHolder.prototype.updateIncrement = function(increment) {
			this.increment = increment;
		}

		/* Render the Node Logo Background */
		renderBackground = function(opacity) {
			/* Get Background Reference */
			screenWidth = window.innerWidth;
			screenHeight = window.innerHeight;

			numberOfRows = Math.ceil(screenHeight / 40) + 20;
			numberofCols = Math.floor(screenWidth / 40) + 20;

			var img = new Image();
			img.src = '../images/nodejs.png';

			draw = function() {
				var i, k, opacityIndex, opacity, rowImgHolderArray, imgHolder;
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				for (i = 0; i < numberOfRows; i++) {
					if (imgStateArray[i]) {
						rowImgHolderArray = imgStateArray[i];
					} else {
						rowImgHolderArray = [];
						imgStateArray.push(rowImgHolderArray);
					}
					//rowImgHolderArray = imgStateArray[i] || [];
					for (j = 0; j < numberofCols; j++) {
						if (rowImgHolderArray[j]) {
							imgHolder = rowImgHolderArray[j];
						} else {
							imgHolder = new ImgStateHolder(i, j, Math.floor(10 * Math.random()), true);
							rowImgHolderArray.push(imgHolder);
						}
						//imgHolder = rowImgHolderArray[j] || new ImgStateHolder(i, j, Math.floor(10 * Math.random()), true);

						//Get Opacity Index from State Holder
						opacityIndex = imgHolder.opacityIndex;

						//Check and Set Increment to False
						if (opacityIndex == 9) {
							imgHolder.updateIncrement(false);
						} else if (opacityIndex == 0) {
							imgHolder.updateIncrement(true);
						}

						//Increment Or Decrement Opacity Index
						if (imgHolder.increment) {
							opacityIndex += 1;
						} else {
							opacityIndex -= 1;
						}

						//Update new Opacity in the Holder
						imgHolder.updateOpacityIndex(opacityIndex);

						//Get Opacity
						opacity = opacityScale[opacityIndex];

						//Set Draw Opacity
						ctx.globalAlpha = opacity;
						if (i % 2 == 0) {
							ctx.drawImage(img, (40 * j) - 20, (30 * i));
						} else {
							ctx.drawImage(img, (40 * j), (30 * i));
						}
					}
				};
			};

			img.addEventListener("load", function() {
				draw();
			}, false);

		};

		/* Animate Background */
		startAnimation = function() {
			animation = setInterval(draw, 200);
		}

		/* Stop Background Animation */
		stopAnimation = function() {
			if (animation) {
				clearInterval(animation);
			}
		}

		/* Clear the Node logo Background */
		clearBackground = function() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
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