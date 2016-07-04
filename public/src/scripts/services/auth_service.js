app.factory('AuthUser', ['$http', '$window', '$location', function($http, $window, $location) {
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
		},
		logoutUser: function() {
			$window.sessionStorage.removeItem('token');
			$window.sessionStorage.removeItem('user');
			$window.sessionStorage.removeItem('group');
			$location.path('login');
		}
	}

}]);