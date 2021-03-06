app.factory('ExpenseService', ['$http', '$q', '$window', function($http, $q, $window) {
	var addExpense, getExpenses, getGroupExpenses, getGroupRentals, saveGroupRentals;

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

	getExpenses = function(username, month, year) {
		var deferred = $q.defer(),
			token = $window.sessionStorage.getItem('token');
		$http({
			method: 'GET',
			url: '/getexpenses',
			params: {
				username: username,
				month: month,
				year: year
			},
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

	getGroupExpenses = function(group) {
		var deferred = $q.defer(),
			token = $window.sessionStorage.getItem('token');
		$http({
			method: 'GET',
			url: '/getgroupexpenses',
			params: {group: group},
			headers: {
				'Authorization': 'JWT ' + token,
				'Content-Type': 'application/json'
			}
		}).then(function(response) {
			var responseData = response.data;
			if (responseData.success) {
				deferred.resolve(responseData.result);
			} else {
				deferred.reject("Failed to load Data");
			}
		}, function(error) {
			deferred.reject(error);
		});

		return deferred.promise;
	};

	getGroupRentals = function(group) {
		var deferred = $q.defer(),
			token = $window.sessionStorage.getItem('token');
		$http({
			method: 'GET',
			url: '/getrentals',
			params: {group: group},
			headers: {
				'Authorization': 'JWT ' + token,
				'Content-Type': 'application/json'
			}
		}).then(function(response) {
			var responseData = response.data;
			if (responseData.success) {
				deferred.resolve(responseData.rentals);
			} else {
				deferred.reject("Failed to load Data");
			}
		}, function(error) {
			deferred.reject(error);
		});

		return deferred.promise;
	};

	saveGroupRentals = function(group, rentals) {
		var deferred = $q.defer(),
			token = $window.sessionStorage.getItem('token');
		$http({
			method: 'POST',
			url: '/saverentals',
			data: {
				group: group,
				rentals: rentals
			},
			headers: {
				'Authorization': 'JWT ' + token,
				'Content-Type': 'application/json'
			}
		}).then(function(response) {
			var responseData = response.data;
			deferred.resolve(responseData.message);
		}, function(error) {
			deferred.reject(error);
		});

		return deferred.promise;
	}

	return {
		addExpense: addExpense,
		getExpenses: getExpenses,
		getGroupExpenses: getGroupExpenses,
		getGroupRentals: getGroupRentals,
		saveGroupRentals: saveGroupRentals
	}
}]);