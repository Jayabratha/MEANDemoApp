app.controller('registerController', ['$scope', '$http', '$timeout', '$rootScope',
	function($scope, $http, $timeout, $rootScope) {
		var homeLayout = $scope.home.layout;
		homeLayout.setVars('small');

		/* Register Form Model */
		this.userData = {
			username: '',
			sex: 'Male',
			dob: '',
			addr: '',
			exp: 0,
			email: '',
			password: '',
			confirmPassword: ''
		}

		this.notifyErrors = false;

		this.submitRegisterForm = function(formStatus, userData) {
			if (formStatus) {
				$http({
					method: 'POST',
					url: '/register',
					data: userData,
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(function(response) {
					var responseData = response.data;
					$scope.displayModal();
					if (responseData.success) {
						$rootScope.setMessage(responseData.message, 'View Profile', 'profile', false);
					} else {
						$rootScope.setMessage(responseData.message, 'Okay', 'login', false);
					}
				}, function(error){
					alert('Error Occurred!');
				});
			} else {
				this.notifyErrors = true;
			}
		};
	}
]);