app.controller('loginController', ['$scope', '$rootScope', '$state', '$timeout', 'AuthUser', '$window',
	function($scope, $rootScope, $state, $timeout, AuthUser, $window) {
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
					if (response.success && response.token) {
						//Save Token
						$window.sessionStorage.setItem('token', response.token)
						$state.go('home.addExpense');
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