app.factory('ExpenseService', ['$http', '$q', '$window', function($http, $q, $window) {
	var addExpense, getExpenses;

	addExpense = function(expenseData) {
		console.log(expenseData);
		var deferred = $q.defer(),
			token = $window.sessionStorage.getItem('token');
		$http({
			method: 'POST',
			url: '/addexpense',
			data: expenseData,
			headers: {
				'Authorization': 'JWT ' + token,
				'Content-Type': 'application/json'
			}
		}).then(function(response) {
			var responseData = response.data;
			deferred.resolve(responseData);
		}, function(error) {
			deferred.reject(error);
		});

		return deferred.promise;
	};

	getExpenses = function(username) {
		var deferred = $q.defer(),
			token = $window.sessionStorage.getItem('token');
		$http({
			method: 'GET',
			url: '/getexpenses',
			params: {username: username},
			headers: {
				'Authorization': 'JWT ' + token,
				'Content-Type': 'application/json'
			}
		}).then(function(response) {
			var responseData = response.data;
			deferred.resolve(responseData);
		}, function(error) {
			deferred.reject(error);
		});

		return deferred.promise;
	}

	return {
		addExpense: addExpense,
		getExpenses: getExpenses
	}
}]);