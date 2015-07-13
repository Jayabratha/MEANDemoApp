app.controller('loginController', ['$scope', '$location', '$timeout', 'AuthUser', function($scope, $location, $timeout, AuthUser){
	if (console) console.log("In Login Controller");
	$scope.setVars();

	$scope.showRegisterForm = function(){
		//$timeout(function() {$location.path('register');$scope.loginstate.flipHide();}, 500);
		$location.path('register');
	}


	$scope.submitLoginForm = function(formStatus){
		if(formStatus == true){
			if (console) console.log("Authenticating .. " + $scope.loginDetail.email);
			$scope.displayModal();	
			if (console) console.log(AuthUser);
			AuthUser.authenticateUser( $scope.loginDetail, function(response){
				if(response.success){
						//$scope.hideModal();
						$location.path('profile');
				}
				else {
					$scope.setMessage(response.message, 'Try Again', 'login', false);
				}
				
			});
		}	

	}

}]);