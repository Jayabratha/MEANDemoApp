app.controller('loginController', ['$scope', '$rootScope', '$state', '$timeout', 'AuthUser',
	function($scope, $rootScope, $state, $timeout, AuthUser) {
		var homeLayout = $scope.home.layout;
		homeLayout.setVars();

		this.credentails = {
			email: '',
			password: ''
		};

		this.notifyErrors = false;

		this.submitLoginForm = function(formStatus, credentails) {
			if (formStatus) {
				if (console) console.log("Authenticating .. " + credentails.email);
				$rootScope.displayModal();
				if (console) console.log(AuthUser);
				$timeout(function() {
					AuthUser.authenticateUser(credentails, function(response) {
						if (response.success) {
							$state.go('profile.timeline');
						} else {
							$rootScope.setMessage(response.message, 'Try Again', 'login', false);
						}
					});
				}, 1000);
			} else {
				this.notifyErrors = true;
			}
		}
	}
]);