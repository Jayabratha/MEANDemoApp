app.controller('profileController',['$scope', 'getUserService',  '$rootScope',
 function($scope, getUserService, $rootScope){
	$scope.homeCntrl.activeTab = "profile";

	var self = this;

	this.userData = {
			username: '',
			firstname: '',
			lastname: '',
			phone: null,
			sex: 'Male',
			dob: '',
			address: '',
			exp: 0,
			email: ''
		}

	getUserService.getUserDetails().then(
		function(userData) {
			console.log(userData);
			self.userData.username = userData.username;
			self.userData.firstname = userData.firstname;
			self.userData.lastname = userData.lastname;
			self.userData.phone = userData.phone;
			self.userData.sex = userData.sex;
			self.userData.dob = new Date(userData.dob);
			self.userData.address = userData.address;
			self.userData.exp = userData.exp;
			self.userData.email = userData.email;
		},
		function(error) {
			$rootScope.displayModal();
			$rootScope.setMessage('Sorry! We ran into an Error. Please try later.', 'Okay', '', false);
		});

}]);