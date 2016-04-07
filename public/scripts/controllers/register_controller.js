app.controller('registerController', ['$scope', '$http', '$timeout',
	function($scope, $http, $timeout) {
		var homeLayout = $scope.home.layout;
		homeLayout.setVars('small');

		/* Register Form Model */
		this.userData = {
			username: '',
			sex: '',
			dob: '',
			addr: '',
			role: {
				designer: false,
				developer: false
			},
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
						$scope.setMessage(responseData.message, 'View Profile', 'profile', false);
					} else {
						$scope.setMessage(responseData.message, 'Okay', 'login', false);
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