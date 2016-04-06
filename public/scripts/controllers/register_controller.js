app.controller('registerController', ['$scope', '$http', '$timeout',
	function($scope, $http, $timeout) {
		var homeLayout = $scope.home.layout;
		homeLayout.setVars();

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
				if (console) console.log("Sending request for: " + userData.username);
				$scope.displayModal();
				$http({
					method: 'POST',
					url: '/register',
					data: userData,
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(function(response) {
					if (console) console.log(response);
					if (response.success) {
						$scope.setMessage(response.message, 'View Profile', 'profile', false);
					} else {
						$scope.setMessage(response.message, 'Okay', '', false);
					}
				}, function(error){
					alert('Error Occurred!');
				})
			} else {
				this.notifyErrors = true;
			}
		};
	}
]);