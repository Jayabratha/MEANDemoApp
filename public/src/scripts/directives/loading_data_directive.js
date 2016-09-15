/* This Directive is to Show the Loading overlay when data is loading */
app.directive('loadingData', [function() {
	return {
		restrict: 'E',
		template: '<div class="data-modal"></div><div class="loading-icon start-ani"></div>'
	};
}]);