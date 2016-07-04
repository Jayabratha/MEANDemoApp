app.controller('homeController', ['$scope', '$rootScope', '$http', '$location', 'userdata', '$window', '$sce', 'fileReaderService', 'photoUploadService', 'AuthUser',
	function($scope, $rootScope, $http, $location, userdata, $window, $sce, fileReaderService, photoUploadService, AuthUser) {
		var vm = this, Profile, homeLayout = $scope.home.layout,
		    User = function(username, firstname, lastname, phone, sex, dob, address, exp, email, group, admin, dpLink, created_at, updated_at) {
				this.username = username;
				this.firstname = firstname;
				this.lastname = lastname;
				this.phone = phone;
				this.sex = sex;
				this.dob = dob;
				this.address = address;
				this.exp = exp;
				this.email = email;
				this.group = group;
				this.admin = admin;
				this.dpLink = dpLink;
				this.created_at = created_at;
				this.updated_at = updated_at;
			};
			
		homeLayout.setVars('line');

		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
						'November', 'December'];

		vm.showMenu = false;

		vm.activeTab = "addexpense";

		vm.currentMonth = months[(new Date()).getMonth()];

		vm.currentYear = (new Date()).getFullYear();

		vm.dpPhotoUpload;

		//Save Username in Session
		$window.sessionStorage.setItem('user', userdata.username);
		//Save Group Name in Session
		$window.sessionStorage.setItem('group', userdata.group);

		
		vm.logOut = function() {
			AuthUser.logoutUser();
		};

		vm.showMenuFunc = function() {
			if ($scope.showMenu === "show") {
				$scope.showMenu = "";
			} else {
				$scope.showMenu = "show";
			}
		};

		vm.createDPPreview = function(){
			var file = vm.dpPhotoUpload;
			fileReaderService.readAsDataUrl(file, $scope)
					 .then(function(result) {
					 	file = result.file
	                    vm.user.dpLink = result.src;
	                 });
		};

		vm.uploadDp = function(){
			console.log(vm.dpPhotoUpload);
			photoUploadService.uploadPhotos(vm.dpPhotoUpload, userdata.username).then(function(uploadedFile){
				uploadedFileName = uploadedFile.filename;
				console.log(uploadedFileName);
			});
		};

		this.user = new User(userdata.username, userdata.firstname, userdata.lastname, userdata.phone, userdata.sex, userdata.dob, userdata.address, userdata.exp, userdata.email, userdata.group, userdata.admin, userdata.dpLink, userdata.created_at, userdata.updated_at);
		$rootScope.hideModal();
	}
]);