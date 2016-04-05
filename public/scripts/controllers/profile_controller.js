app.controller('profileController', ['$scope', '$rootScope', '$http', '$cookies', '$location', 'userdata', function($scope, $rootScope, $http, $cookies, $location, userdata){
	if (console) console.log("In Profile Controller");
	$scope.setVars();
	
	$scope.activeView = "active";
	$scope.activePhotos = "";
	$scope.activeEdit = "";
	$scope.showMenu = "";
	
	$scope.showProfile = function(){
		$scope.activeView = "active";
		$scope.activeEdit = "";
		$scope.activePhotos = "";
	};
	$scope.showPhotos = function(){
		$scope.activeView = "";
		$scope.activeEdit = "";
		$scope.activePhotos = "active";
	};
	$scope.showEditProfile = function(){
		$scope.activeView = "";
		$scope.activeEdit = "active";
		$scope.activePhotos = "";
	};
	$scope.logOut = function(){
		$cookies.put('user', '');
		$location.path('login');
	};
	$scope.showMenuFunc = function(){
		if($scope.showMenu === "show"){
			$scope.showMenu = "";
		}
		else {
			$scope.showMenu = "show";
		}
	};
	var User = function(username, sex, dob, address, designer, developer, salary, email, password, created_at, updated_at){
		this.username = username;
		this.sex = sex;
		this.dob = dob;
		this.address = address;
		this.role = {
			'designer' : designer,
			'developer': developer
		}
		this.salary = salary;
		this.email = email;
		this.password = password;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}
	$scope.user = new User(userdata.username, userdata.sex, userdata.dob, userdata.address, userdata.role.designer, userdata.role.developer, userdata.salary, userdata.email, userdata.password, userdata.created_at, userdata.updated_at);
	$rootScope.hideModal();
	
	
}]);