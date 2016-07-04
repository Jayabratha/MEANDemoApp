/* Render and Start Background Animation*/
var backgroundAnimation = bgAnimate.getInstance();
backgroundAnimation.renderBackground();
backgroundAnimation.startAnimation();

window.onload=function() { 
	var appLoadingIcon = document.getElementById('app-loading');
	setTimeout(function () {
		var headerElem = document.getElementById('main-header');
		appLoadingIcon.style.display = 'none';
		console.log(headerElem.classList);
		headerElem.classList.remove('loading');
		angular.bootstrap(document, ['app']);
	}, 500);
	setTimeout(function () {
		var buttons = document.getElementById('home-buttons');
		buttons.classList.remove('loading');
	}, 1000);
}