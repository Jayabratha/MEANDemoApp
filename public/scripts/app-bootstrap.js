window.onload=function() { 
	setTimeout(function () {
		var headerElem = document.getElementById('main-header');
		console.log(headerElem.classList);
		headerElem.classList.remove('loading');
		angular.bootstrap(document, ['app']);
	}, 2000);
	setTimeout(function () {
		var buttons = document.getElementById('home-buttons');
		buttons.classList.remove('loading');
	}, 3000);

}