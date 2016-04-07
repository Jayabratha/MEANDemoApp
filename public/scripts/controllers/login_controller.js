app.controller('loginController', ['$scope', '$rootScope', '$state', '$timeout', 'AuthUser',
	function($scope, $rootScope, $state, $timeout, AuthUser) {
		var homeLayout = $scope.home.layout;
		homeLayout.setVars('small');

		this.credentails = {
			email: '',
			password: ''
		};

		this.notifyErrors = false;

		this.submitLoginForm = function(formStatus, credentails) {
			if (formStatus) {
				AuthUser.authenticateUser(credentails, function(response) {
					if (response.success) {
						$state.go('profile.timeline');
					} else {
						$rootScope.displayModal();
						$rootScope.setMessage(response.message, 'Try Again', 'login', false);
					}
				});
			} else {
				this.notifyErrors = true;
			}
		}
	}
]);