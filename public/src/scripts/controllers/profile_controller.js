app.controller('profileController',['$scope', 'UserService',  '$rootScope', 'AuthUser',
 function($scope, UserService, $rootScope, AuthUser){
	var vm = this;

	$scope.homeCntrl.activeTab = "profile";

	vm.notifyErrors = false;
	vm.userData = {
			username: '',
			firstname: '',
			lastname: '',
			phone: null,
			sex: 'Male',
			dob: '',
			address: '',
			exp: 0,
			email: ''
		};

	UserService.getUserDetails().then(
		function(userData) {
			console.log(userData);
			vm.userData.username = userData.username;
			vm.userData.firstname = userData.firstname;
			vm.userData.lastname = userData.lastname;
			vm.userData.phone = userData.phone;
			vm.userData.sex = userData.sex;
			vm.userData.dob = new Date(userData.dob);
			vm.userData.address = userData.address;
			vm.userData.exp = userData.exp;
			vm.userData.email = userData.email;
		},
		function(error) {
			$rootScope.displayModal();
			$rootScope.setMessage('Sorry! We ran into an Error. Please try later.', 'Okay', '', false);
		});

	vm.updateProfile = function (isValid, userData) {
		if (isValid) {
			UserService.updateUserDetails(userData.username, userData.firstname, userData.lastname, userData.phone,
			 userData.sex, userData.dob, userData.address, userData.exp).then(
			 function(response) {
				$rootScope.displayModal();
				$rootScope.setMessage(response, 'Okay', '', false);
			},
			function(error) {
				$rootScope.displayModal();
				$rootScope.setMessage("Couldn't update your profile", 'Try Again', '', false);
			});
		} else {
			vm.notifyErrors = true;
		}
	};

	vm.deleteAccount = function (userToDelete) {
		UserService.deleteAccount(userToDelete).then(
			 function(response) {
				$rootScope.displayModal();
				AuthUser.logoutUser();
				$rootScope.setMessage(response, 'Okay', 'home', false);
			},
			function(error) {
				$rootScope.displayModal();
				$rootScope.setMessage("Couldn't delete your profile", 'Try Again', '', false);
			});
	}

}]);
