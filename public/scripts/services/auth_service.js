app.factory('AuthUser', ['$http', function($http) {
	return {
		authenticateUser: function(loginDetail, callback) {
			$http({
				method: 'POST',
				url: '/auth',
				data: loginDetail,
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(
				function(response) {
					callback(response.data);
				},
				function(error) {
					if (console) console.error("Error Occurred " + error);
				})
		}
	}

}]);