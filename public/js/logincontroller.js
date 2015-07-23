app.controller('loginController', ['$scope', '$rootScope', '$state', '$timeout', 'AuthUser', function($scope, $rootScope, $state, $timeout, AuthUser){
	if (console) console.log("In Login Controller");
	$scope.setVars();

	$scope.showRegisterForm = function(){
		//$timeout(function() {$location.path('register');$scope.loginstate.flipHide();}, 500);
		$location.path('register');
	}


	$scope.submitLoginForm = function(formStatus){
		if(formStatus == true){
			if (console) console.log("Authenticating .. " + $scope.loginDetail.email);
			$rootScope.displayModal();	
			if (console) console.log(AuthUser);
			$timeout(function(){
				AuthUser.authenticateUser( $scope.loginDetail, function(response){
				if(response.success){
						//$scope.hideModal();
						$state.go('profile.timeline');
				}
				else {
					$rootScope.setMessage(response.message, 'Try Again', 'login', false);
				}
				
				});
			}, 1000);
		}	

	}

}]);