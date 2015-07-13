var app = angular.module('app', ['ngAnimate', 'ui.router', 'ngCookies']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("");
	$stateProvider.
		state('home', {
				url: '',
				templateUrl: 'homepage.html',
				controller: 'homepageController'
		}).
		state('login', {
				url: '/login',
				templateUrl: 'login.html',
				controller: 'loginController',
				resolve: {
					go : function(flipService){
						return flipService.flipLogin();
					}
				}
		}).
		state('register', {
				url: '/register',
				templateUrl: 'register.html',
				controller: 'registerController',
				resolve: {
					go : function(flipService){
						return flipService.flipLogin();
					}
				}
		}).
		state('profile', {
				url: '/profile',
				templateUrl: 'profile.html',
				controller: 'profileController',
				resolve: {
					userdata : function(getUserService){
						console.log("Testing Profile");
						return getUserService.getUserDetails();
					}
				}
		}).
		state('profile.photos', {
				url: '/photos',
				templateUrl: 'profilephotos.html',
				controller: 'photosController'
		}).
		state('profile.edit', {
				url: '/edit',
				templateUrl: 'editprofile.html',
				controller: 'profileEditController'
		})
}]);


app.run(['$rootScope', '$timeout', function($rootScope, $timeout){
	$rootScope.$on('$stateChangeStart', function(event, toState, toParam, fromState, fromParams){
		console.log("Route Change Started");
		if(fromState.name === 'login'){
			$rootScope.loginstate.flipHide();
		}
		else if(fromState.name === 'register'){
			$rootScope.registerstate.flipHide();
		}
	});
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParam, fromState, fromParams){
		console.log("Route Change Success");
		if(toState.name === 'register'){
			$rootScope.registerstate.flipShow();
		}
		else if(toState.name === 'login'){
			$rootScope.loginstate.flipShow();
		}
	});
}]);

app.controller('appController', [ '$q', '$scope', '$rootScope', '$location', '$timeout', function($q, $scope, $rootScope, $location, $timeout) {

	console.log("In App Controller");

	/*Homepage State variables*/
	$scope.homestate = {
		headerClass : "",
		contentClass : "",
		showButton : "",
		showModal : ""
	};

	/*Login State variables*/
	$rootScope.loginstate = {
		state : 'fliphide',
		preload : 'preload',
		flipShow : function(){
			$timeout(function(){
				$rootScope.loginstate.preload = "";
				$rootScope.loginstate.state = "";
			}, 10);
			$timeout(function(){
				$rootScope.loginstate.preload = "preload";
			}, 1000);
		},
		flipHide : function(){
			$timeout(function(){
				$rootScope.loginstate.preload = "";
				$rootScope.loginstate.state = "fliphide";
			}, 0);
			$timeout(function(){
				$rootScope.loginstate.preload = "preload";
			}, 1000);
			
		}
	};

	/*Register State variables*/
	$rootScope.registerstate = {
		state : 'fliphide',
		preload : 'preload',
		flipShow : function(){
			$timeout(function(){
				$rootScope.registerstate.preload = "";
				$rootScope.registerstate.state = "";
			}, 0);
			$timeout(function(){
				$rootScope.registerstate.preload = "preload";
			}, 1000);
		},
		flipHide : function(){
			$timeout(function(){
				$rootScope.registerstate.preload = "";
				$rootScope.registerstate.state = "fliphide";
			}, 0);
			$timeout(function(){
				$rootScope.registerstate.preload = "preload";
			}, 1000);
			
		}
	};


	
	/*Profile State variables*/
	/*$scope.profilestate = {
		profilePageState : 'initial',
		profilePreloadClass : 'preload'
	};*/

	$scope.messageObj = {message: 'Task In Progress', action: '', link: '', inprogress: true };


	$scope.setMessage = function(message, action, link, inprogress){
		$scope.messageObj.message = message;
		$scope.messageObj.action = action;
		$scope.messageObj.link = link;
		$scope.messageObj.inprogress = inprogress;
	}

	$scope.displayModal = function(){
		$scope.showModal = "show";
	}

	$scope.hideModal = function(){
		$scope.showModal = "";
	}

	$scope.popAction = function(){
		if($scope.messageObj.action == 'Okay'){
			$scope.hideModal();
		}
		else if($scope.messageObj.link == 'profile'){
			$scope.hideModal();
			$location.path('profile');	
		}
		else if($scope.messageObj.link == 'login'){
			$scope.hideModal();
			$location.path('login');	
		}
	}
	

	$scope.resetVars = function(){
		console.log("Resetting Vars");
		$scope.homestate.headerClass = "";
		$scope.homestate.contentClass = "";
		$scope.homestate.showButton = "";
	}

	$scope.setVars = function(){
		$scope.homestate.headerClass = 'small';
		$scope.homestate.contentClass = 'showForm';
		$scope.homestate.showButton = 'hide';
		document.body.scrollTop = 0;
	}

}]);

