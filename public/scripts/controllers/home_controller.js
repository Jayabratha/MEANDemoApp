app.controller('homeController', ['$scope', '$rootScope', '$http', '$cookies', '$location', 'userdata', '$window',
	function($scope, $rootScope, $http, $cookies, $location, userdata, $window) {
		var Profile, homeLayout = $scope.home.layout;
		homeLayout.setVars('line');

		homeLayout.showCanvas = false;

		this.showMenu = false;

		this.activeTab = "addexpense";

		
		this.logOut = function() {
			$window.sessionStorage.removeItem('token');
			$location.path('login');
		};
		this.showMenuFunc = function() {
			if ($scope.showMenu === "show") {
				$scope.showMenu = "";
			} else {
				$scope.showMenu = "show";
			}
		};

		var User = function(username, sex, dob, address, designer, developer, salary, email, password, created_at, updated_at) {
			this.username = username;
			this.sex = sex;
			this.dob = dob;
			this.address = address;
			this.salary = salary;
			this.email = email;
			this.password = password;
			this.created_at = created_at;
			this.updated_at = updated_at;
		}

		this.user = new User(userdata.username, userdata.sex, userdata.dob, userdata.address, userdata.salary, userdata.email, userdata.password, userdata.created_at, userdata.updated_at);
		$rootScope.hideModal();
	}
]);