app.factory('getUserService', ['$q','$http', '$cookies', function( $q, $http, $cookies ){
	return {
		getUserDetails: function() {
			$cookies.testcookie = 'MySessionCookie';
			if (console) console.log($cookies);
			var currentuser = $cookies.user;
			if (console) console.log(currentuser);
			var deferred = $q.defer();
			if(currentuser != null && currentuser != "" ){
				if (console) console.log("Current User: " + currentuser);
				$http({
					method  : 'GET',
					url     : '/profile',
					headers : { 
						'Content-Type': 'application/json' ,
						'Cache-Control': 'no-cache, no-store, must-revalidate',
						'Pragma' : 'no-cache',
	                    'Expires' : '0'
	                     },
					cache   : false
				}).
				success( function(response){
					if(response.success){
						var userdata = response.userObj;
						console.log("Profile Data Received for: " + userdata.username);
						//var user = new User(userdata.username, userdata.sex, userdata.dob, userdata.address, userdata.role.designer, userdata.role.developer, userdata.salary, userdata.email, userdata.password, userdata.created_at, userdata.updated_at);
						deferred.resolve(userdata);
					}
					else {
						if (console) console.log("Error Occurred!");
						//$scope.displayModal();
						//$scope.setMessage(response.message, 'Try Again', 'login', false);
						deferred.reject(response.message);
					}
				}).
				error( function(error){
					console.error("Error Occured" + error);
					//$scope.displayModal();
					//$scope.setMessage("Sorry! We encountered an error", 'Try Again', 'login', false);
					deferred.reject("Sorry! We encountered an error");
				})
			}
			else {
				if (console) console.log("No User Logged In");
				$scope.displayModal();
				$scope.setMessage('Please login first.', 'LogIn', 'login', false);
				deferred.reject("error");
			}

			return deferred.promise;
		}
	}
}]);