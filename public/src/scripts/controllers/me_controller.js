app.controller('meController', ['$scope', '$timeout', function ($scope, $timeout) {
	var vm = this, homeLayout = $scope.home.layout;

	homeLayout.setVars('hello');

	$timeout(function () {
		homeLayout.setVars('invisible');
		vm.visibility = 'visible';
	}, 2000);

}]);