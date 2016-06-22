app.factory('UserService', ['$q', '$http', '$rootScope', '$window',
	function($q, $http, $rootScope, $window) {
		var getUserDetails, getGroupMembers;

		getUserDetails = function() {
			var token = $window.sessionStorage.getItem('token'),
				deferred = $q.defer();
			if (token) {
				$http({
					method: 'GET',
					url: '/profile',
					headers: {
						'Authorization': 'JWT ' + token,
						'Content-Type': 'application/json',
						'Cache-Control': 'no-cache, no-store, must-revalidate',
						'Pragma': 'no-cache',
					},
					cache: false
				}).then(
					function(response) {
						var data = response.data;
						if (data.success) {
							var userdata = data.userObj;
							console.log("Profile Data Received for: " + userdata.username);
							deferred.resolve(userdata);
						} else {
							if (console) console.log("Error Occurred!");
							deferred.reject(data.message);
						}
					},
					function(error) {
						console.error("Error Occured" + error);
						deferred.reject("Sorry! We encountered an error");
					})
			} else {
				if (console) console.log("No User Logged In");
				deferred.reject("Please login first");
			}

			return deferred.promise;
		};

		getGroupMembers = function(group) {
			var token = $window.sessionStorage.getItem('token'),
				deferred = $q.defer();
			if (token) {
				$http({
					method: 'GET',
					url: '/getgroup',
					params: {group: group},
					headers: {
						'Authorization': 'JWT ' + token,
						'Content-Type': 'application/json',
						'Cache-Control': 'no-cache, no-store, must-revalidate',
						'Pragma': 'no-cache',
					},
					cache: false
				}).then(
					function(response) {
						var data = response.data;
						if (data.success) {
							var groupMembers = data.members;
							deferred.resolve(groupMembers);
							console.log(groupMembers);
						} else {
							if (console) console.log("Error Occurred!");
							deferred.reject(data.message);
						}
					},
					function(error) {
						console.error("Error Occured" + error);
						deferred.reject("Sorry! We encountered an error");
					})
			} else {
				if (console) console.log("No User Logged In");
				deferred.reject("Please login first");
			}

			return deferred.promise;
		};

		return {
			getUserDetails: getUserDetails,
			getGroupMembers: getGroupMembers
		}
	}
]);