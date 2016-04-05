app.controller('registerController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
	if (console) console.log("In Register Controller");
	$scope.setVars();

	$scope.submitRegisterForm = function(formStatus) {
		if(formStatus){
			if (console) console.log("Sending request for: " + $scope.userData.username);
			$scope.displayModal();
			$http({
				method  : 'POST',
				url     : '/register',
	  			data    : $scope.userData,  
	  			headers : { 'Content-Type': 'application/json' }
			}).
			success( function(response){
				if (console) console.log(response);
				if(response.success){
					$scope.setMessage(response.message, 'View Profile', 'profile', false);
				}
				else {
					$scope.setMessage(response.message, 'Okay', '', false);
				}		
			})
		}	
	}
}]);




