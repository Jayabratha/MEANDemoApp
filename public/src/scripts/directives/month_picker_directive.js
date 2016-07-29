app.directive('monthPicker', [function () {
	return {
		restrict : 'E',
		scope: {
			currentMonth: '=?',
			currentYear: '=?'
		},
		templateUrl : 'templates/month_picker.html',
		link: function (scope, element, attrs) {
			var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			scope.currentMonthToShow = months[scope.currentMonth];
			console.log(scope.currentMonth, scope.currentMonthToShow);

			scope.goPrevious = function () {
				var newMonthIndex;
				if (scope.currentMonth === 0) {
					scope.currentMonth = 11;
					scope.currentYear = scope.currentYear - 1;
				} else {
					scope.currentMonth = scope.currentMonth - 1
				}
				scope.currentMonthToShow = months[scope.currentMonth];

			}

			scope.goNext = function () {
				var newMonthIndex;
				if (scope.currentMonth === 11) {
					scope.currentMonth = 0;
					scope.currentYear = scope.currentYear + 1;
				} else {
					scope.currentMonth = scope.currentMonth + 1
				}
				scope.currentMonthToShow = months[scope.currentMonth];
			}

		}
	}
}]);