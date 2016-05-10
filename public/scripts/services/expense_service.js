app.factory('ExpenseService', ['$http', function($http) {
	return {
		addExpense: function(expenseData) {
			$http({
				method: 'POST',
				url: '/addexpense',
				data: expenseData,
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(function(response) {
				var responseData = response.data;
				$scope.displayModal();
				$rootScope.setMessage(responseData.message, 'Okay', 'login', false);				
			}, function(error) {
				alert('Error Occurred!');
			});
		}

	}

}]);