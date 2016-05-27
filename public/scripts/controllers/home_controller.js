app.controller('homeController', ['$scope', '$rootScope', '$http', '$cookies', '$location', 'userdata', '$window', '$sce',
	function($scope, $rootScope, $http, $cookies, $location, userdata, $window, $sce) {
		var Profile, homeLayout = $scope.home.layout;
		homeLayout.setVars('line');

		this.showMenu = false;

		this.activeTab = "addexpense";

		//Save Username in Session
		$window.sessionStorage.setItem('user', userdata.username);
		//Save Group Name in Session
		$window.sessionStorage.setItem('group', userdata.group);

		
		this.logOut = function() {
			$window.sessionStorage.removeItem('token');
			$window.sessionStorage.removeItem('user');
			$location.path('login');
		};
		this.showMenuFunc = function() {
			if ($scope.showMenu === "show") {
				$scope.showMenu = "";
			} else {
				$scope.showMenu = "show";
			}
		};

		var User = function(username, firstname, lastname, phone, sex, dob, address, exp, email, group, admin, dpLink, created_at, updated_at) {
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

		this.user = new User(userdata.username, userdata.firstname, userdata.lastname, userdata.phone, userdata.sex, userdata.dob, userdata.address, userdata.exp, userdata.email, userdata.group, userdata.admin, userdata.dpLink, userdata.created_at, userdata.updated_at);
		$rootScope.hideModal();
	}
]);